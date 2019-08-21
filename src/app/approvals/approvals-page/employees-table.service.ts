import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Approval} from './items.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable({
  providedIn: 'root'
})

export class ApprovalsService {

  private API_URL = 'http://localhost:3000/approvals-items';
  private queryUrl = '?name=';
   httpOptions = {
    mode: 'no-cors',
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Approval[]> {
    return this.http.get<Approval[]>(this.API_URL, this.httpOptions).pipe(
      tap((data: Approval[]) => console.log('All: ' + JSON.stringify(data))),
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

  update(employee: Approval) {
    return this.http.put<void>(`${this.API_URL}/${employee.id}`, JSON.stringify(employee), this.httpOptions).pipe(
      tap(updateEmployee => console.log('update employee in approval: ' + JSON.stringify(updateEmployee))),
      catchError(this.handleError));
  }
  add(employee: Approval) {
    return this.http.post<Approval>(this.API_URL, JSON.stringify(employee), this.httpOptions).pipe(
      tap(addApproval => console.log('add approval: ' + JSON.stringify(addApproval))),
      catchError(this.handleError));
  }
  filterByPeriod(term) {
    return this.http
      .get(this.API_URL + '?period=' + term, this.httpOptions)
      .map(res => res);
  }
}
