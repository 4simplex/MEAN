import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryModel} from '../models/category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly URL_API = 'http://localhost:3000/api/category/';

  constructor(private http: HttpClient) { }

  getCategory() {
    return this.http.get(this.URL_API);
  }

  postCategory(category: CategoryModel) {
    return this.http.post(this.URL_API, category);
  }
}
