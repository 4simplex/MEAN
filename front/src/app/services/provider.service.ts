import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Provider } from '../models/provider-model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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

  getProviders() {
    return this.http.get(this.URL_API);
  }

  getProvider(id: string): Observable<Provider> {
    const url = `${this.URL_API}/${id}`;
    return this.http.get<Provider>(url).pipe(
      catchError(this.handleError<Provider>(`getProvider id=${id}`))
    );
  }

  postProvider(provider: Provider): Observable<Provider> {
    return this.http.post<Provider>(this.URL_API, provider);
  }

  putProvider(provider: Provider) {
    return this.http.put(this.URL_API + `/${provider._id}`, provider);
  }

  deleteProvider(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

  getProviderByName(name, id): Observable<Provider> {
    return this.http.get<Provider>(this.URL_API + `/${id}` + `/${name}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.info('LOG ERROR BEGIN');
      console.error(`${operation} failed: ${error.message}`);
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      console.info('LOG ERROR END');

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
