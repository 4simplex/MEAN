import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/customValidators';

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
    providerPrice: new FormControl('', [
      Validators.required,
      CustomValidators.cannotContainsEmptySpace
    ])
  })

  ngOnInit() {
  }

}
