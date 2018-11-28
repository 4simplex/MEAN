import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/customValidators';
import { ProductService } from '../../services/product.service';

declare var M: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
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

  ngOnInit() {
   document.addEventListener('DOMContentLoaded', function() {
      var opt= {};
      var ele = document.querySelectorAll('select');
      var ins = M.FormSelect.init(ele, opt);
      var datapicker = document.querySelectorAll('.datepicker');
      var datep = M.Datepicker.init(datapicker, opt);
    });
  }

  addNewProduct(){
    //this.productService.postProduct(this.productForm.value);
    console.log(this.productForm.value)
  }
}
