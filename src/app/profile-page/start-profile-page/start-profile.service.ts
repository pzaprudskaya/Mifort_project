import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StartProfileService {

  constructor(private http: HttpClient) { }
  sendEmail(email) {
    return this.http.post('http://localhost:3000/sendNotificationOwner', email);
  }

}
