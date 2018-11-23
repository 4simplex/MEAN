import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/customValidators';

declare var M: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = fb.group({
      'name': ['', Validators.required],
      'category': fb.group({
        'name': ['']
      }),
      'brand': fb.group({
        'name': ['']
      }),
      'photo': fb.group({
        'name': ['']
      })
    });
  }

  /*productForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl(),
    photo: new FormControl()
  });*/

  ngOnInit() {
   document.addEventListener('DOMContentLoaded', function() {
      var opt= {};
      var ele = document.querySelectorAll('select');
      var ins = M.FormSelect.init(ele, opt);
      var datapicker = document.querySelectorAll('.datepicker');
      var datep = M.Datepicker.init(datapicker, opt);
    });
  }

  newProduct() {
    console.log(this.productForm);
  }
}
