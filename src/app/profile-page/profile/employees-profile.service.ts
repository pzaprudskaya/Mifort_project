import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {Profile} from './profile.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Injectable({
  providedIn: 'root'
})


export class EmployeesProfileService {

  private API_URL = 'http://localhost:3000/employee-profile/';
  nameEmployee: string;
  httpOptions = {
    mode: 'no-cors',
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) { }

  getEmployee(): Observable<Profile> {
    return this.http.get<Profile>(this.API_URL + this.nameEmployee, this.httpOptions).pipe(
      tap((data: Profile) => console.log('Employee: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  update(emploee: Profile) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put<void>(`${this.API_URL}/${emploee.name}`, JSON.stringify(emploee), httpOptions).pipe(
      tap(updateEmploee => console.log('update emploee: ' + JSON.stringify(updateEmploee))),
        catchError(this.handleError));
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
  public getName(name: string): void {
    this.nameEmployee = name;
  }





}
