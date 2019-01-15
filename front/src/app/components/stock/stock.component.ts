import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { getNoImage } from '../../../assets/noimage';
import { StockService } from '../../services/stock.service';
import { Stock } from 'src/app/models/stock-model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stockForm: FormGroup;
  noImage = getNoImage();
  prodCode;

  productFileImage = "";

  constructor(private fb: FormBuilder, private location: Location, private stockService: StockService) { 
    this.stockForm = fb.group({
      'purchasePrice': ['', Validators.required],
      'salePrice': ['', Validators.required],
      'provider': fb.group({
        '_id': [''],
        'name': ['']
      }),
      'productForm': fb.group({
        'product': ['']
      })
    });
  }

  ngOnInit() {
    this.getAllStockItems();
  }

  addStock() {
    const purchasePrice = this.stockForm.get('purchasePrice').value;
    const salePrice = this.stockForm.get('salePrice').value;
    if(!purchasePrice || !salePrice){
      return;
    }
    this.stockService.postStock(this.stockForm.value)
      .subscribe(res => {
        let st = res as Stock;
        this.prodCode = st.productCode;
        this.getAllStockItems();
      });
    console.log(this.stockForm.value);
  }

  getAllStockItems() {
    this.stockService.getStockLst()
      .subscribe(res => {
        this.stockService.stockLst = res as Stock[];
      });
  }
  
  displayProductImage(product) {
    if(product){
      this.productFileImage = product.fileImg;
    }
  }
  
  goBack(): void {
    this.location.back();
  }
  
}