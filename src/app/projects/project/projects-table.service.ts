import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {Project} from './items.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';



@Injectable({
  providedIn: 'root'
})


export class ProjectsTableService {
  /*projects: Observable<Project[]>;
  private _projects: BehaviorSubject<Project[]>;
  private dataStore: {
    projects: Project[]
  };*/
  private API_URL = 'http://localhost:3000/project-items';
  private queryUrl = '?name=';

  constructor(private http: HttpClient) {
   // this.dataStore = { todos: any[] };
   // this._projects = <BehaviorSubject<Project[]>>new BehaviorSubject([]);
   // this.todos = this._projects.asObservable();
  }
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



  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }
  searchEntries(term) {
    return this.http
      .get(this.API_URL + this.queryUrl + term)
      .map(res => res);
  }




  filter(term) {
    return this.http
      .get(this.API_URL + '?status=' + term)
      .map(res => res);
  }


  update(project: Project) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put<void>(`${this.API_URL}/${project.name}`, JSON.stringify(project), httpOptions).pipe(
      tap(updateProject => console.log('update project: ' + JSON.stringify(updateProject))),
        catchError(this.handleError));
  }

}
