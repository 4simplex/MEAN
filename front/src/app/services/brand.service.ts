import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrandModel } from '../models/brand-model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  readonly URL_API = 'http://localhost:3000/api/brand/';

  constructor(private http: HttpClient) { }

  getBrand() {
    return this.http.get(this.URL_API);
  }

  postBrand(brand: BrandModel) {
    return this.http.post(this.URL_API, brand);
  }
}