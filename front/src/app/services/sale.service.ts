import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sale } from 'src/app/models/sale-model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  readonly URL_API = 'http://localhost:3000/api/sale';
  constructor(private http: HttpClient) { }

  postSale(sale: Sale) {
    return this.http.post(this.URL_API, sale);
  }
}
