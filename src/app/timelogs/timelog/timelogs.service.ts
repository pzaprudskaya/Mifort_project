import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {TimelogModel} from './timelog.model';


@Injectable({
  providedIn: 'root'
})


export class TimelogsService {

  private API_URL = 'http://localhost:3000/logs';
  httpOptions = {
    mode: 'no-cors',
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getLogs(): Observable<TimelogModel[]> {
    return this.http.get<TimelogModel[]>(this.API_URL, this.httpOptions).pipe(
      tap((data: TimelogModel[]) => console.log('logs: ' + JSON.stringify(data))),
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

  addLog(log: TimelogModel): Observable<TimelogModel> {
    return this.http.post<TimelogModel>(this.API_URL, JSON.stringify(log), this.httpOptions).pipe(
      tap(addLog => console.log('add log: ' + JSON.stringify(addLog))),
      catchError(this.handleError));
  }
  deleteLog(log: TimelogModel): Observable<TimelogModel> {

    return this.http.delete<TimelogModel>(`${this.API_URL}/${log.projectName}`, this.httpOptions).pipe(
      tap(deleteLog => console.log('delete log: ' + JSON.stringify(deleteLog))),
      catchError(this.handleError));
  }


}
