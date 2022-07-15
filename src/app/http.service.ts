import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = "http://localhost:8080/";
  constructor(
    private http: HttpClient
  ) { }

  getRequest(url: string): Observable<any> {
    return this.http.get(this.baseUrl + url).pipe(
      catchError(this.handleError)
    )
  }

  postRequest(url: string, data:any, option?: any): Observable<any> {
    return this.http.post(this.baseUrl + url, data, option).pipe(
      catchError(this.handleError)
    )
  }

  updateRequest(url: string, data:any, option?: any): Observable<any> {
    return this.http.put(this.baseUrl + url, data, option).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
