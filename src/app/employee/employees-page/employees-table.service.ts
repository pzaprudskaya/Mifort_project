import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Employees} from './items.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Injectable({
  providedIn: 'root'
})


export class EmployeesTableService {

  private API_URL = 'http://localhost:3000/employee-items';
  private queryUrl = '?name=';
  httpOptions = {
    mode: 'no-cors',
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Employees[]> {
    return this.http.get<Employees[]>(this.API_URL, this.httpOptions).pipe(
      tap((data: Employees[]) => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {

      errorMessage = `An error occurred: ${err.error.message}`;
    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }



  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }
  searchEntries(term) {
    return this.http
      .get(this.API_URL + this.queryUrl + term, this.httpOptions)
      .map(res => res);
  }

  filter(term) {
    return this.http
      .get(this.API_URL + '?status=' + term, this.httpOptions)
      .map(res => res);
  }




}
