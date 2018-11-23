import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { NgForm } from '@angular/forms';
import { Stock } from 'src/app/models/stock-model';

declare var M: any;

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.getStockLst();
  }

  addStock(form: NgForm){
    if(form.value._id){
      this.stockService.putStock(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Updated successfuly'});
        this.getStockLst();
      })
    }else{
      this.stockService.postStock(form.value)
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Save successfuly'});
        this.getStockLst();
      });
    }
  }

  getStockLst(){
    this.stockService.getStockLst()
      .subscribe(res => {
        this.stockService.stockLst = res as Stock[];
        console.log(res);
      });
  }

  editStock(stock: Stock){
    this.stockService.selectedStock = stock;
  }

  deleteStock(_id: string){
    if(confirm('Está seguro de querer eliminarlo?')){
      this.stockService.deleteStock(_id)
        .subscribe(res => {
          M.toast({html: 'Deleted successfuly'});
          this.getStockLst();
        });
    }
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.stockService.selectedStock = new Stock();
    }
  }

}
