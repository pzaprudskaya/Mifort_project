import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {NotificationModel} from './notifications.model';


@Injectable({
  providedIn: 'root'
})


export class NotificationService {
  name: string;
  private API_URL = 'http://localhost:3000/notification/';
  httpOptions = {
    mode: 'no-cors',
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(this.API_URL, this.httpOptions).pipe(
      tap((data: NotificationModel[]) => console.log('notifications: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  addNotification(log: NotificationModel): Observable<NotificationModel> {
    return this.http.post<NotificationModel>(this.API_URL, JSON.stringify(log), this.httpOptions).pipe(
      tap(addNotification => console.log('add notification: ' + JSON.stringify(addNotification))),
      catchError(this.handleError));
  }

  update(notification: NotificationModel) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put<void>(`${this.API_URL}`, JSON.stringify(notification), httpOptions).pipe(
      tap(updateNotification => console.log('update notification: ' + JSON.stringify(updateNotification))),
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
}

