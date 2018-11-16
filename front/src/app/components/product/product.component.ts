import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/customValidators';

declare var M:any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  constructor() { }

  productForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    /*code: new FormControl(''),
    customerPrice:  new FormControl(''),
    providerPrice: new FormControl('', [
      Validators.required,
      CustomValidators.cannotContainsEmptySpace
    ]),
    stockQuantity: new FormControl('')*/
    
  })
  
  ngOnInit() {
    var options = {};
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, options);

      var datapicker = document.querySelectorAll('.datepicker');
      var datep = M.Datepicker.init(datapicker, options);
    });
  }

}
