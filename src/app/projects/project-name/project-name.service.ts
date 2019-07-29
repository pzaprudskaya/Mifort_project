import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {ProjectNameModel} from './project-name.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Injectable({
  providedIn: 'root'
})


export class ProjectNameService {

  private API_URL = 'http://localhost:3000/project/';
  nameProject: string;

  constructor(private http: HttpClient) { }

  getProject(): Observable<ProjectNameModel> {
    return this.http.get<ProjectNameModel>(this.API_URL + this.nameProject).pipe(
      tap((data: ProjectNameModel) => console.log('Project: ' + JSON.stringify(data))),
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
    this.nameProject = name;
  }





}
