import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {CompanySettingsModel} from './company-settings.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Injectable({
  providedIn: 'root'
})


export class CompanySettingsService {
  private API_URL = 'http://localhost:3000/settings/';
  companyName: string;
  nameUser: string;;
  httpOptions = {
    mode: 'no-cors',
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) { }
  getCompany(): Observable<CompanySettingsModel> {
    if (this.companyName === 'createCompany') {
      return this.http.get<CompanySettingsModel>(this.API_URL + 'Name', this.httpOptions).pipe(
        tap((data: CompanySettingsModel) => console.log('Company: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
    } else {
      return this.http.get<CompanySettingsModel>(this.API_URL + this.companyName, this.httpOptions).pipe(
        tap((data: CompanySettingsModel) => console.log('Company: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
    }
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
  public setCompany(option): void {
    this.companyName = option;
  }
  update(company: CompanySettingsModel) {
    debugger;
    return this.http.put<void>(`${this.API_URL}/${company.id}`, JSON.stringify(company), this.httpOptions).pipe(
        tap(companyUpdate => console.log('update company: ' + JSON.stringify(companyUpdate))),
        catchError(this.handleError));
  }
  addCompany(company: CompanySettingsModel) {
    return this.http.post<CompanySettingsModel>(this.API_URL, JSON.stringify(company), this.httpOptions).pipe(
      tap(addCompany => console.log('add company: ' + JSON.stringify(addCompany))),
      catchError(this.handleError));
  }
  public getName(name: string): void {
    this.nameUser = name;
  }
}
