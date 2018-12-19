import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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
    });
  }

  newStock() {
    console.log(this.stockForm);
  }

}