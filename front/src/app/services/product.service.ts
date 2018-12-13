import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly URL_API = 'http://localhost:3000/api/product';
  products: ProductModel[];
  selectedProduct: ProductModel;

  constructor(private productService: HttpClient) { }

  getProduct(){
    return this.productService.get(this.URL_API)
  }

  postProduct(product){
    this.productService.post(this.URL_API, product)
    .subscribe(res => {
      console.log(res)
    })
  }

  deleteProduct(_id){
    return this.productService.delete(this.URL_API, _id);
  }
}
