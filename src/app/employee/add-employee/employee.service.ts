import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {Profile} from '../../profile-page/profile/profile.model';
import {Employees} from '../employees-page/items.model';
import {TimelogModel} from "../../timelogs/timelog/timelog.model";


@Injectable({
  providedIn: 'root'
})


export class EmployeesService {

  private API_URL = 'http://localhost:3000/employee-profile/';
  private API_URL_TWO = 'http://localhost:3000/employee-items/';
  httpOptions = {
    mode: 'no-cors',
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  nameEmployee: string;

  constructor(private http: HttpClient) { }

  getEmployee(): Observable<Profile> {
    return this.http.get<Profile>(this.API_URL + this.nameEmployee, this.httpOptions).pipe(
      tap((data: Profile) => console.log('Employee: ' + JSON.stringify(data))),
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
  public getName(name: string): void {
    this.nameEmployee = name;
  }
  update(employee: Profile) {

    return this.http.put<void>(`${this.API_URL}${employee.name}`, JSON.stringify(employee), this.httpOptions).pipe(
      tap(updateEmployee => console.log('update project: ' + JSON.stringify(updateEmployee))),
      catchError(this.handleError));
  }
  updateTwo(employee: Employees) {
    return this.http.put<void>(`${this.API_URL_TWO}${employee.name}`, JSON.stringify(employee), this.httpOptions).pipe(
      tap(updateEmployee => console.log('update project: ' + JSON.stringify(updateEmployee))),
      catchError(this.handleError));
  }





}
