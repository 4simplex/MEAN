import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { getNoImage } from '../../../assets/noimage';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  @Input('parentForm')
  public parentForm: FormGroup;

  @Output() valueChange = new EventEmitter();
  fileImg;

  @Input() loadImg: string;

  constructor() {
  }

  ngOnInit() {
    if (!this.fileImg) {
      this.fileImg = getNoImage();
    }

  }

  showImgPrev() {
    this.fileImg = '';
    this.valueChange.emit(this.fileImg);
  }

  initImgPrev() {
    console.log(this.parentForm.get('fileImg').value);

  }

  readImgUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(event.target.files[0]);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.fileImg = btoa(binaryString);  // Converting binary string data.

    this.valueChange.emit(this.fileImg);
  }

}
