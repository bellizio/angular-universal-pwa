import { Injectable, Inject, Optional } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private apiUrl: string = '';

  constructor(
    private http: HttpClient,
    @Optional()
    @Inject(APP_BASE_HREF)
    baseUrl: string
  ) {
    this.apiUrl = baseUrl ? baseUrl : this.apiUrl;
  }

  request(method: string, path: string, options?: any): Observable<any> {
    return this.http
      .request(method, path, options)
      .pipe(
        map((response: any) => this.transformResponse(response)),
        catchError(this.handleError<any>(`${path}: ${method}`))
      );
  }

  get(path: string, options?: any) {
    return this.request('GET', this.buildPath(path), options);
  }

  post(path: string, options?: any) {
    return this.request('POST', this.buildPath(path), options);
  }

  put(path: string, options?: any) {
    return this.request('PUT', this.buildPath(path), options);
  }

  delete(path: string) {
    return this.request('DELETE', this.buildPath(path));
  }

  private buildPath(path): string {
    const urlPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.apiUrl}${urlPath}`;
  }

  private transformResponse(res: any): any {
    // do any necessary data transformations of response here
    return res;
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
      console.error(`${operation} failed: ${error.message}`); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
