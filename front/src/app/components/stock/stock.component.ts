import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

declare var M: any;

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stockForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.stockForm = fb.group({
      'purchasePrice': ['', Validators.required],
      'salePrice': ['', Validators.required],
      'stockQty': ['', Validators.required],
      'provider': fb.group({
        'name': ['']
      }),
      'product': fb.group({
        'name': ['']
      })
    });
  }

  ngOnInit() {
    document.addEventListener('DOMContentLoaded', function(){
      var opt = {};
      var ele = document.querySelectorAll('select');
      var ins = M.FormSelect.init(ele, opt);
    });
  }

  newStock() {
    console.log(this.stockForm);
  }
}