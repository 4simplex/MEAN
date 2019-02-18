import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  loading;
  purchaseTotal;
  salesTotal;
  earningsTotal;
  bsConfig;
  bsRangeValue;
  today = new Date();
  firstDay;
  sells;
  chartLabels: any[];
  dataSell;

  constructor(private saleService: SaleService) { }

  ngOnInit() {
    this.loading = true;
    this.initialValues();
   
  }

  initialValues() {
    this.today = new Date();
    this.firstDay = this.calculateFirstDayMonth(this.today);

    this.saleService.getSales(this.firstDay.toISOString(), this.today.toISOString())
    .subscribe(res => {
      this.loading = false;
      this.purchaseTotal = this.sumPurchaseTotal(res);
      this.salesTotal = this.sumSellTotal(res);
      this.earningsTotal = this.salesTotal - this.purchaseTotal;
      this.sells = res;

      this.dataSell = this.sells.map(sale => {
        return sale.saleTotal;
      });

      this.chartLabels = this.sells.map(sale => {
        let getSaleDate = new Date(sale.saleDate);
        let year = getSaleDate.getFullYear();
        let month = getSaleDate.getMonth()+1;
        let dt = getSaleDate.getDate();

        if (dt < 10) {
          dt = 0 + dt;
        }
        if (month < 10) {
          month = 0 + month;
        }


        return dt + '/' + month + '/' + year 
      });

      console.log(res)
    })
  }

  calculateFirstDayMonth(today) {
    const month = today.getMonth();
    const year = today.getFullYear();

    return new Date(year, month, 1);
  }

  sumPurchaseTotal (res) {
    const total = res.reduce((acc, item) => {
      return acc + item.purchasePriceTotal;
    }, 0)

    return total;
  }

  sumSellTotal (res) {
    const total = res.reduce((acc, item) => {
      return acc + item.saleTotal;
    }, 0)

    return total;
  }

}
