import { Injectable } from '@angular/core';
import {
  HttpBackend,
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError, tap, retry, delay } from 'rxjs/operators';
import { CustomHttpError } from '../models/custom-http-error.model';

@Injectable({ providedIn: 'root' })
export class CrudService {
  private url: string;
  private httpOptions: any;
  http: HttpClient;

  constructor(
    private httpClient: HttpClient,
    private httpBackend: HttpBackend,
  ) {
    this.http = new HttpClient(httpBackend);
  }

  private _refreshNeeded$ = new Subject<void>();
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  get(endpoint: string, requestParam?, admin = true) {
    if (requestParam) {
      return this.httpClient
        .get(`${endpoint}`, {
          params: requestParam,
        })
        .pipe(
          map((res) => res),
          catchError(this.handleHttpError)
        );
    } else {
      return this.httpClient.get(`${endpoint}`).pipe(
        map((res) => res),
        catchError(this.handleHttpError)
      );
    }
  }

  post(newObject, endpoint: string, admin = true) {
    return this.httpClient.post(`${endpoint}`, newObject).pipe(
      map((res) => res),
      retry(3), // you retry 3 times
      delay(1000), // each retry will start after 1 second,
      catchError(this.handleHttpError)
    );
  }

  put(endpoint: string, requestParam, admin = true) {
    return this.httpClient.put(`${endpoint}`, requestParam).pipe(
      map((res) => res),
      catchError(this.handleHttpError)
    );
  }

  delete<T>(endpoint: string, admin = true): Observable<T | CustomHttpError> {
    return this.httpClient.delete<T>(`${endpoint}`).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      }),
      map((res) => res),
      catchError(this.handleHttpError)
    );
  }

  import<T, O>(
    newObject: T,
    endpoint: string
  ): Observable<any | CustomHttpError> {
    return this.httpClient
      .post<O>(`${this.url}${endpoint}`, newObject, {
        responseType: 'blob' as 'json',
        observe: 'response' as 'body',
      })
      .pipe(
        map((res) => res),
        catchError(this.handleHttpError)
      );
  }

  private handleHttpError(
    errorResponse: HttpErrorResponse
  ): Observable<CustomHttpError> {
    const { status, message } = errorResponse.error;
    return throwError({ status, message });
  }
}
