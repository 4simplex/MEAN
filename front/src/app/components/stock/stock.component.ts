import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stockForm: FormGroup;

  constructor(private fb: FormBuilder, private location: Location) { 
    this.stockForm = fb.group({
      'purchasePrice': ['', Validators.required],
      'salePrice': ['', Validators.required],
      'stockQty': ['', Validators.required],
      'provider': fb.group({
        '_id': [''],
        'name': ['']
      }),
      'product': fb.group({
        '_id': [''],
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

  addStock() {
  }
  
  goBack(): void {
    this.location.back();
  }
}