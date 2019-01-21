import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product-model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly URL_API = 'http://localhost:3000/api/product';
  products: Product[];
  selectedProduct: Product;

  constructor(private productService: HttpClient) { }

  getProduct() {
    return this.productService.get(this.URL_API)
  }

  postProduct(product) {
    return this.productService.post(this.URL_API, product)
  }

  deleteProduct(_id: string) {
    return this.productService.delete(this.URL_API + `/${_id}`);
  }

  getProductById(id): Observable<Product> {
    return this.productService.get<Product>(this.URL_API + `/${id}`);
  }

  getProductByName(name, id): Observable<Product> {
    return this.productService.get<Product>(this.URL_API + `/${id}` + `/${name}`);
  }

  updateProduct(product) {
    return this.productService.put(this.URL_API + `/${product._id}`, product);
  }

  brandHasProducts(id): Observable<Product> {
    return this.productService.get<Product>(this.URL_API + `/brand/${id}`);
  }

  categoryHasProducts(id): Observable<Product> {
    return this.productService.get<Product>(this.URL_API + `/category/${id}`);
  }
}
