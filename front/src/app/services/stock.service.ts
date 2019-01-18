import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Stock } from '../models/stock-model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StockService {
  selectedStock: Stock;
  stockLst: Stock[];
  readonly URL_API = 'http://localhost:3000/api/stock'

  constructor(private http: HttpClient) { 
    this.selectedStock = new Stock();
  }

  getStockLst(){
    return this.http.get(this.URL_API);
  }

  getStockById(id: string): Observable<Stock> {
    const url = `${this.URL_API}/${id}`;
    return this.http.get<Stock>(url).pipe(
      // tap(_ => console.info(`Fetched stock id=${id}`)),
      catchError(this.handleError<Stock>(`getStock id=${id}`))
    );
  }

  postStock(stock: Stock){
    return this.http.post(this.URL_API, stock);
  }

  /** PUT: update the stock on the server */
  updateStock(stock: Stock): Observable<any> {
    return this.http.put(this.URL_API + `/${stock._id}`, stock, httpOptions).pipe(
      // tap(_ => console.info(`Updated brand id=${brand._id}`)),
      catchError(this.handleError<any>('updateBrand'))
    );
  }

  deleteStock(stock: Stock | string){
    const id = typeof stock === 'string' ? stock : stock._id;
    const url = `${this.URL_API}/${id}`;

    return this.http.delete<Stock>(url, httpOptions).pipe(
      tap(_ => console.info(`Deleted stock id=${id}`)),
      catchError(this.handleError<Stock>('deleteStock'))
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
}
