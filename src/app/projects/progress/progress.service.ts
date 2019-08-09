import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Project} from '../project/items.model';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private API_URL = 'http://localhost:3000/project-items';
  constructor(private http: HttpClient) { }
  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.API_URL).pipe(
      tap((data: Project[]) => console.log('All: ' + JSON.stringify(data))),
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
  update(project: Project) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<Project>(this.API_URL, JSON.stringify(project), httpOptions).pipe(
      tap(chahge => console.log('add log: ' + JSON.stringify(chahge))),
      catchError(this.handleError));
  }
}
