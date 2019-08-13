import {Injectable} from '@angular/core';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';

import {catchError, tap, map} from 'rxjs/operators';
import {User} from './user.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public userSubject = new BehaviorSubject(null);
  userSubject$ = this.userSubject.asObservable();
  private API_URL = 'http://localhost:3000/activity/';
  httpOptions = {
    mode: 'no-cors',
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }),
  };
  constructor(private http: HttpClient) { }

  getUser(nameUser): Observable<User> {
    return this.http.get<User>(this.API_URL + nameUser, this.httpOptions).pipe(

      tap((data: User) => console.log('User: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateUser(user: User) {
    debugger;
    return this.http.put<void>(`${this.API_URL}${user.name}`, JSON.stringify(user), this.httpOptions).pipe(
      tap(userUpdate => console.log('update user: ' + JSON.stringify(userUpdate))),
      catchError(this.handleError));
  }

  updateCompany(name: string) {
    this.userSubject.next(name);
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
}
