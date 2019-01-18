import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { getNoImage } from '../../../assets/noimage';
import { Stock } from '../../models/stock-model';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {
  stockForm: FormGroup;
  stock: Stock; 
  initImg: string;
  stockId: string;
  productLongNameProp: string;
  noImage = getNoImage();
  
  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      '_id': [''],
      'purchasePrice': ['', Validators.required],
      'salePrice': ['', Validators.required],
      'productCode': [''],
      'productLongName': [''],
      'provider': this.fb.group({
        '_id': [''],
        'name': ['']
      }),
      'productForm': this.fb.group({
        'product': this.fb.group({
          '_id':[''],
          'category': this.fb.group({
            '_id': [''],
            'name': ['']
          }),
          'brand': this.fb.group({
            '_id': [''],
            'name': ['']
          }),
          'name':[''],
          'fileImg':['']
        })
      })
    });
    const idStock = this.route.snapshot.paramMap.get('id');
    this.stockService.getStockById(idStock)
      .subscribe(res => {
        this.stock = res;
        this.stockForm.get('purchasePrice').setValue(this.stock.purchasePrice);
        this.stockForm.get('salePrice').setValue(this.stock.salePrice);
        this.stockForm.get('productCode').setValue(this.stock.productCode);
        this.stockForm.get('productForm.product._id').setValue(this.stock.productForm.product._id);
        this.stockForm.get('productForm.product.fileImg').setValue(this.stock.productForm.product.fileImg);
        this.stockForm.get('productForm.product.name').setValue(this.stock.productForm.product.name);
        this.stockForm.get('provider._id').setValue(this.stock.provider._id);
        this.stockForm.get('provider.name').setValue(this.stock.provider.name);
        this.initImg = this.stockForm.get('productForm.product.fileImg').value;
        this.stockForm.get('_id').setValue(this.stock._id);
        this.stockForm.get('productForm.product.brand.name').setValue(this.stock.productForm.product.brand.name);
        this.stockForm.get('productForm.product.category.name').setValue(this.stock.productForm.product.category.name);
        this.productLongNameProp = this.stockForm.get('productForm.product.brand.name').value 
          + ' - ' + this.stockForm.get('productForm.product.name').value 
          + ' - ' + this.stockForm.get('productForm.product.category.name').value;
        this.stockForm.get('productLongName').setValue(this.productLongNameProp);
      });
  }

  getStock(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.stockService.getStockById(id)
      .subscribe(s => this.stock = s);
  }

  save(): void {
    this.stockService.updateStock(this.stockForm.value)
      .subscribe(() => this.goBack());
  }

  // displayCounter(count) {
  //   this.stockForm.get('productForm.product.fileImg').setValue(count);
  // }

  // displayProductImage(product) {
  //   // console.log(product);
  //   if(product){
  //     this.stockForm.get('productForm.product.fileImg').setValue(product);
  //   }
  // }

  goBack(): void {
    this.location.back();
  }

}
