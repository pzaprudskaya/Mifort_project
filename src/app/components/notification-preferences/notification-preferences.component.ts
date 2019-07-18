import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-preferences',
  templateUrl: './notification-preferences.component.html',
  styleUrls: ['./notification-preferences.component.sass']
})
export class NotificationPreferencesComponent implements OnInit {
  public notifications = [
    {
      name: 'Timelogs are not filled for more then 24 hours',
    },
    {
      name: '1 week before deadline',
    },
    {
      name: 'Status of a project you’re assigned to has been changed',
    },
    {
      name: 'Status of submitted timesheet has been changed',
    },
    {
      name: 'Your workload has been changed',
    },
    {
      name: 'Your role has been changed',
    },
    {
      name: 'User, invited by you, has joined your company',
    },

  ];
  constructor() { }

  ngOnInit() {
  }

}
