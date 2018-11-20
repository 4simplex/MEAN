import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/customValidators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  constructor() {

  }

  productForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl(),
    photo: new FormControl()
  });

  ngOnInit() {
   /* document.addEventListener('DOMContentLoaded', function() {
      var options= {};
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, options);
      var datapicker = document.querySelectorAll('.datepicker');
      var datep = M.Datepicker.init(datapicker, options);
    });*/
  }

  newProduct() {
    console.log(this.productForm);
  }
}
