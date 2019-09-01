import {Component, OnInit} from '@angular/core';
import {NotificationService} from './notifications.service';
import { NotificationModel} from './notifications.model';
import {UserService} from '../logo-user-company/user.service';
import {EmployeesService} from '../../employee/employee.service';
import {Profile} from '../../employee/employee.model';
import {User} from '../logo-user-company/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  arrayNotifications: any[];
  flag = false;
  roleUser: string;
  newRoleUser: string;
  ownerName: string;
  nameCompany: string;
  isOpen = false;
  user: User;
  employee: Profile;
  workload: number;
  notification: NotificationModel;
  constructor(private notificationService: NotificationService,
              private userService: UserService, private employeesService: EmployeesService) {
  }

  ngOnInit() {
    this.userService.userName$.subscribe((userName) => {
      this.employeesService.getEmployee(userName).subscribe(
        employee => {
          this.workload = employee[0].workload;
        });
      this.notificationService.getNotifications().subscribe(
        notification => {
          notification.forEach((item) => {
            if (item.name === userName && item.notificationsType.system === true) {
              this.notification = notification[0];
            }
          });
          if (this.notification.notifications.length !== 0) {
            this.flag = true;
          }
        });
    });
  }

  updateNotifications() {
    this.notification.notifications = [];
    this.notificationService.update(this.notification).subscribe(() => console.log('Update!'));
  }


  openNotifications(e) {
    if (!this.flag) {
      return;
    }
    const div = e.parentElement.parentElement.nextElementSibling;
    if (div.classList.contains('active')) {
      this.isOpen = false;
      this.flag = false;
      this.updateNotifications();
    } else {
      this.isOpen = true;
    }
  }

  logOut() {
    localStorage.removeItem('token');
  }

}
