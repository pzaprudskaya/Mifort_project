import { Component, OnInit } from '@angular/core';
import {NotificationService} from './notifications.service';
import {Notification} from './timelog.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  notification: Notification;
  arrayNotifications: any[];

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
  	this.arrayNotifications = [];
  	this.notificationService.getNotifications().subscribe(
      notification => {
      	notification.forEach((item) => {
      		this.arrayNotifications.push(item);
      	})
      })
  	console.log(this.arrayNotifications);
  }
}
