import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import { Project } from './export.model';
@Injectable({
  providedIn: 'root'
})
export class ExportService {
  
  private API_URL = 'http://localhost:3000/project/Uber';

  constructor(private http: HttpClient) { }

  getProject(nameProject): Observable<Project> {
    return this.http.get<any>(this.API_URL + nameProject).pipe(
      tap((data: any) => console.log('Project: ' + JSON.stringify(data))),
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
}
