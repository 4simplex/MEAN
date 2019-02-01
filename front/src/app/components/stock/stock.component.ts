import { Component, OnInit } from '@angular/core';
import { getNoImage } from '../../../assets/noimage';
import { PriceService } from '../../services/price.service';
import { Price } from 'src/app/models/price-model';
import { appLiterals } from '../../resources/appLiteral';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  noImage = getNoImage();
  appLiterals;

  constructor(private priceService: PriceService) {
    this.appLiterals = appLiterals;
  }

  ngOnInit() {
    this.getAllPriceItems();
  }

  getAllPriceItems() {
    this.priceService.getPriceLst()
      .subscribe(res => {
        this.priceService.prices = res as Price[];
      });
  }

  updateStock(price: Price) {
    this.priceService.updatePrice(price)
      .subscribe(res => {
        if (res) {
          alert('Stock actualizado');
        }
      });
  }
}
