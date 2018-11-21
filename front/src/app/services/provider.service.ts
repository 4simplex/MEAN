import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Provider } from '../models/provider-model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  selectedProvider: Provider;
  providers: Provider[];
  readonly URL_API = 'http://localhost:3000/api/provider';

  constructor(private http: HttpClient) { 
    this.selectedProvider = new Provider();
  }

  getProviders(){
    return this.http.get(this.URL_API);
  }

  postProvider(provider: Provider){
    return this.http.post(this.URL_API, provider);
  }

  putProvider(provider: Provider){
    return this.http.put(this.URL_API + `/${provider._id}`, provider);
  }

  deleteProvider(_id: string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
