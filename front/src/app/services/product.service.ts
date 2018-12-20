import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product-model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly URL_API = 'http://localhost:3000/api/product';
  products: ProductModel[];
  selectedProduct: ProductModel;

  constructor(private productService: HttpClient) { }

  getProduct() {
    return this.productService.get(this.URL_API)
  }

  postProduct(product) {
    return this.productService.post(this.URL_API, product)
  }

  deleteProduct(_id) {
    return this.productService.delete(this.URL_API, _id);
  }

  getProductById(id): Observable<ProductModel> {
    return this.productService.get<ProductModel>(this.URL_API + `/${id}`);
  }

  updateProduct(product) {
    return this.productService.put(this.URL_API + `/${product._id}`, product);
  }
}
