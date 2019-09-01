import {Component, OnInit} from '@angular/core';
import {NotificationService} from './notifications.service';
import {Notification} from './notifications.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  notification: Notification;
  arrayNotifications: any[];
  notificationsType: object;
  flag = false;
  nameUser = 'Polina Zaprudskaya';
  roleUser: string;
  newRoleUser: string;
  ownerName: string;
  nameCompany: string;
  isOpen = false;
  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.arrayNotifications = [];
    this.notificationService.getNotifications().subscribe(
      notification => {
        notification.forEach((item) => {
          if (item.name === this.nameUser && item.notificationsType.system === true) {
            this.arrayNotifications = item.notifications;
            this.notificationsType = item.notificationsType;
          }
        });
        if (this.arrayNotifications.length !== 0) {
          this.flag = true;
        }
      });
  }

  updateNotifications(arr) {
    const myNotification = new Notification(this.nameUser, this.notificationsType, arr);
    console.log(myNotification);
    this.notificationService.update(myNotification)
      .subscribe(() => console.log('Update!'));
  }

  openNotifications(e) {
    if (!this.flag) { return; }
    const div = e.parentElement.parentElement.nextElementSibling;
    if (div.classList.contains('active')) {
      this.isOpen = false;
      this.arrayNotifications = [];
      this.flag = false;
      this.updateNotifications(this.arrayNotifications);
    } else {
      this.isOpen = true;
    }
    console.log(this.arrayNotifications);
  }
  logOut() {
    localStorage.removeItem('token');
  }
}

