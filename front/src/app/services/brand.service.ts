import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../models/brand-model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  selectedBrand: Brand;
  brands: Brand[];
  readonly URL_API = 'http://localhost:3000/api/brand';

  constructor(private http: HttpClient) { 
    this.selectedBrand = new Brand();
  }

  getBrands(){
    return this.http.get(this.URL_API);
  }

  postBrand(brand: Brand){
    return this.http.post(this.URL_API, brand);
  }

  putBrand(brand: Brand){
    return this.http.put(this.URL_API + `/${brand._id}`, brand);
  }

  deleteBrand(_id: string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
