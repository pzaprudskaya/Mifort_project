import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Project} from './project-items.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable({
  providedIn: 'root'
})


export class ProjectsService {
  private API_URL = 'http://localhost:3000/project-items';
  private queryUrl = '?name=';
  httpOptions = {
    mode: 'no-cors',
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(this.API_URL, this.httpOptions).pipe(
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

  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }
  searchEntries(term) {
    return this.http
      .get(this.API_URL + this.queryUrl + term, this.httpOptions)
      .map(res => res);
  }

  filter(term) {
    return this.http
      .get(this.API_URL + '?status=' + term, this.httpOptions)
      .map(res => res);
  }

  update(project: Project) {
    return this.http.put<void>(`${this.API_URL}/${project.name}`, JSON.stringify(project), this.httpOptions).pipe(
      tap(updateProject => console.log('update project: ' + JSON.stringify(updateProject))),
        catchError(this.handleError));
  }
  addNewProject(project: Project) {
    return this.http.post<Project>(this.API_URL, JSON.stringify(project), this.httpOptions).pipe(
      tap(addProject => console.log('add project: ' + JSON.stringify(addProject))),
      catchError(this.handleError));
  }

}
