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
  secondDay = new Date();
  firstDay;
  sells;
  chartLabels: any[];
  dataSell;
  actualPage: Number = 1;

  constructor(private saleService: SaleService) { }

  ngOnInit() {
    this.loading = true;
    this.initialValues();
   
  }

  initialValues() {
    this.secondDay = new Date();
    this.firstDay = this.calculateFirstDayMonth(this.secondDay);

    this.saleService.getSales(this.firstDay.toISOString(), this.secondDay.toISOString())
    .subscribe(res => {
      this.loading = false;
      this.purchaseTotal = this.sumPurchaseTotal(res);
      this.salesTotal = this.sumSellTotal(res);
      this.earningsTotal = this.salesTotal - this.purchaseTotal;
      this.sells = res;

      this.dataSell = this.getDataForDates(this.sells);

      this.chartLabels = this.getDates(this.sells);
    })
  }

  changeDatePeriod(event) {
    if(event !== null) {
      this.saleService.getSales(event[0].toISOString(), event[1].toISOString())
      .subscribe(res => {
        this.loading = false;
        this.purchaseTotal = this.sumPurchaseTotal(res);
        this.salesTotal = this.sumSellTotal(res);
        this.earningsTotal = this.salesTotal - this.purchaseTotal;
        this.sells = res;

        this.dataSell = this.getDataForDates(this.sells);

        this.chartLabels = this.getDates(this.sells);
      })

      this.secondDay = event[1];
      this.firstDay = event[0];
    }
  }

  getDataForDates(sells) {
    let temp = this.filterDates(sells);
    const dataSales = [];
    const dataDates = [];

    for (let i=0; i < temp.length; i++){

      let existingDate = dataDates.includes(temp[i].saleDate.substring(0,10));

      if (!existingDate) {
        let sumData;
        sumData = sells.filter(item => item.saleDate.substring(0,10) ===  temp[i].saleDate.substring(0,10))
        .reduce((acc, product) => {
          return acc + product.saleTotal
        }, 0);

        let collectDates = temp[i].saleDate.substring(0,10);

        dataDates.push(collectDates);
        dataSales.push(sumData);
      }
    }

    return dataSales
  }

  filterDates(allDates){
    return allDates.filter((v,i) => allDates.indexOf(v) === i);
  }

  getDates(sells) {
    const allDates = sells.map(sale => {
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

    let x = allDates.filter((v,i) => allDates.indexOf(v) === i);

    return x;
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

  getFormattedPrice(price: number) {
    let currencyPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
    return currencyPrice;
  }
}
