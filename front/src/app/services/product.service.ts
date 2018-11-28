import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly URL_API = 'http://localhost:3000/api/product';

  constructor(private productService: HttpClient) { }

  postProduct(product: ProductModel){
    this.productService.post(this.URL_API, product)
  }
}
