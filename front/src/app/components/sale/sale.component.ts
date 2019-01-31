import { Component, OnInit } from '@angular/core';
import { PriceService } from '../../services/price.service';
import { Price } from 'src/app/models/price-model';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  constructor(private priceService: PriceService) { }

  ngOnInit() {
    this.getPrices();
  }

  getPrices() {
    this.priceService.getPriceLst()
      .subscribe(res => {
        this.priceService.prices = res as Price[];
        console.log(res);
      });
  }

  getFormattedPrice(price: number) {
    let currencyPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
    return currencyPrice;
  }

}
