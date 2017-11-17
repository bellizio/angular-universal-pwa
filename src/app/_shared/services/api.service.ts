import { Injectable, Inject, Optional } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ApiService {

  private apiUrl: string = '';

  constructor (
    private http: HttpClient,
    @Optional() @Inject(APP_BASE_HREF) baseUrl: string
  ) {
    this.apiUrl = baseUrl ? baseUrl : this.apiUrl;
  }

  request(method, path, data?: any) {
    const options: any = {};

    if (data) {
      options.body = data;
    }

    return this.http.request(method, path, options)
      .pipe(
        tap(_ => this.log(`fetched data`)),
        catchError(this.handleError<any>(`${path}: ${method}`))
      );
  }

  get(path, data?: any) {
    return this.request('GET', this.buildPath(path), data);
  }

  post(path, data?: any) {
    return this.request('POST', this.buildPath(path), data);
  }

  put(path, data?: any) {
    return this.request('PUT', this.buildPath(path), data);
  }

  delete(path) {
    return this.request('DELETE', this.buildPath(path));
  }

  search(path, data?: any) {
    return this.request('POST', path, data);
  }

  private buildPath(path) {
    const urlPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.apiUrl}${urlPath}`;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add('HeroService: ' + message);
  }
}
