import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {ProjectNameModel} from './project-name.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {CompanySettingsModel} from "../../company-setting/company-settings/company-settings.model";


@Injectable({
  providedIn: 'root'
})


export class ProjectNameService {

  private API_URL = 'http://localhost:3000/project/';
  nameProject: string;
  httpOptions = {
    mode: 'no-cors',
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) { }

  getProject(): Observable<ProjectNameModel> {
    debugger;
    return this.http.get<ProjectNameModel>(this.API_URL + this.nameProject, this.httpOptions).pipe(
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
  update(project: ProjectNameModel) {

    return this.http.put<void>(`${this.API_URL}${project.name}`, JSON.stringify(project), this.httpOptions).pipe(
      tap(updateProject => console.log('update project: ' + JSON.stringify(updateProject))),
      catchError(this.handleError));
  }
  addNewProject(project: ProjectNameModel) {
    return this.http.post<ProjectNameModel>(this.API_URL, JSON.stringify(project), this.httpOptions).pipe(
      tap(addProject => console.log('add project: ' + JSON.stringify(addProject))),
      catchError(this.handleError));
  }





}
