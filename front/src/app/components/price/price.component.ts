import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { getNoImage } from '../../../assets/noimage';
import { PriceService } from '../../services/price.service';
import { Price } from 'src/app/models/price-model';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  priceForm: FormGroup;
  noImage = getNoImage();
  prodCode: string;
  actualPage: Number = 1;
  productFileImage = "";

  constructor(
    private fb: FormBuilder,
    private priceService: PriceService
  ) {
    this.priceForm = fb.group({
      'productForm': fb.group({
        'product': ['']
      }),
      'provider': fb.group({
        '_id': [''],
        'name': ['']
      }),
      'purchasePrice': ['', Validators.required],
      'salePrice': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getAllPriceItems();
  }

  addPrice() {
    const purchasePrice = this.priceForm.get('purchasePrice').value;
    const salePrice = this.priceForm.get('salePrice').value;
    if (!purchasePrice || !salePrice) {
      return;
    }
    this.priceService.postPrice(this.priceForm.value)
      .subscribe(res => {
        let st = res as Price;
        this.prodCode = st.productCode;
        this.getAllPriceItems();
      });
  }

  getAllPriceItems() {
    this.priceService.getPriceLst()
      .subscribe(res => {
        this.priceService.prices = res as Price[];
      });
  }

  displayProductImage(product) {
    if (product) {
      this.productFileImage = product.fileImg;
    }
  }

  deletePrice(price: Price): void {
    if (confirm('Desea eliminar este item de Precios?')) {
      this.priceService.prices = this.priceService.prices.filter(s => s !== price);
      this.priceService.deletePrice(price).subscribe();
    }
  }

}