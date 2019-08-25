import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { User } from './authorization.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private API_URL = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL).pipe(
      tap((data: User[]) => console.log('User: ' + JSON.stringify(data))),
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
  addNewUser(user, token) {
    const httpOptions = {
      mode: 'no-cors',
      headers: new HttpHeaders({'Content-Type': 'application/json', Authorization: `Bearer ${token}`})
    };
    return this.http.post<User>(this.API_URL, JSON.stringify(user), httpOptions).pipe(
      tap(addUser => console.log('add user: ' + JSON.stringify(addUser))),
      catchError(this.handleError));

  }
}
