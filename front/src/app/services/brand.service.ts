import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Brand } from '../models/brand-model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class BrandService {
  brands: Brand[];
  private URL_API = 'http://localhost:3000/api/brand';

  constructor(private http: HttpClient) { }

  /** GET brands from the server */
  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.URL_API)
      .pipe(
        // tap(_ => console.info('Fetched brands')),
        catchError(this.handleError('getBrands', []))
      );
  }

  /** GET brand by id. Return `undefined` when id not found */
  getBrandNo404<Data>(id: string): Observable<Brand> {
    const url = `${this.URL_API}/?id=${id}`;
    return this.http.get<Brand[]>(url)
      .pipe(
        map(brands => brands[0]), // returns a {0|1} element array
        tap(b => {
          const outcome = b ? `fetched` : `did not find`;
          console.info(`${outcome} brand id=${id}`);
        }),
        catchError(this.handleError<Brand>(`getBrand id=${id}`))
      );
  }

  /** GET brand by id. Will 404 if id not found */
  getBrand(id: string): Observable<Brand> {
    const url = `${this.URL_API}/${id}`;
    return this.http.get<Brand>(url).pipe(
      // tap(_ => console.info(`Fetched brand id=${id}`)),
      catchError(this.handleError<Brand>(`getBrand id=${id}`))
    );
  }

  /* GET brands whose name contains search term */
  searchHeroes(term: string): Observable<Brand[]> {
    if (!term.trim()) {
      // if not search term, return empty brand array.
      return of([]);
    }
    return this.http.get<Brand[]>(`${this.URL_API}/?name=${term}`).pipe(
      // tap(_ => console.info(`found brands matching "${term}"`)),
      catchError(this.handleError<Brand[]>('searchBrands', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new brand to the server */
  addBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.URL_API, brand, httpOptions).pipe(
      // tap((brand: Brand) => console.info(`Added brand w/ id=${brand._id}`)),
      catchError(this.handleError<Brand>('addBrand'))
    );
  }

  /** DELETE: delete the brand from the server */
  deleteBrand(brand: Brand | string): Observable<Brand> {
    const id = typeof brand === 'string' ? brand : brand._id;
    const url = `${this.URL_API}/${id}`;

    return this.http.delete<Brand>(url, httpOptions).pipe(
      // tap(_ => console.info(`Deleted brand id=${id}`)),
      catchError(this.handleError<Brand>('deleteBrand'))
    );
  }

  /** PUT: update the brand on the server */
  updateBrand(brand: Brand): Observable<any> {
    return this.http.put(this.URL_API, brand, httpOptions).pipe(
      // tap(_ => console.info(`Updated brand id=${brand._id}`)),
      catchError(this.handleError<any>('updateBrand'))
    );
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

  getBrandByName(name, id): Observable<Brand> {
    return this.http.get<Brand>(this.URL_API + `/${id}` + `/${name}`);
  }
}
