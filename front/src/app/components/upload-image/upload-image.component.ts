import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  constructor() { 

  }

  ngOnInit() {
;
  }

  showPage(la){
    console.log(la);
    this.fileImg = '';
    this.valueChange.emit(this.fileImg);
  }

  readImgUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);//() => {
        //this.imgUrl = (<FileReader>event.target).result;
        
        
      //};
      reader.readAsBinaryString(event.target.files[0]);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.fileImg = btoa(binaryString);  // Converting binary string data.
    //this.fileImg = event.target.files[0];
    this.valueChange.emit(this.fileImg)
    //console.log(this.fileImg);
}

}
