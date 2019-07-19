import {Component,  OnInit, Output, ViewChild} from '@angular/core';
import {NotificationComponent} from '../notification/notification.component';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.sass']
})
export class IntegrationsComponent implements OnInit {

  @ViewChild('notification') notification: NotificationComponent;
  public itemsAdd = [
    {
      id: 0,
      name: 'AtlassianJira',
      background: 'url(./assets/image/AtlassianJira.svg)',
    },
    {
      id: 1,
      name: 'Slack',
      background: 'url(./assets/image/Slack.svg)',
    },
    {
      id: 2,
      name: 'GitHub',
      background: 'url(./assets/image/GitHub.svg)',
      route: 'company-integration',
    },
    {
      id: 3,
      name: 'Trello',
      background: 'url(./assets/image/Trello.svg)',
    },
    {
      id: 4,
      name: 'Asana',
      background: 'url(./assets/image/Asana.svg)',
    },
    {
      id: 5,
      name: 'IDE',
      background: 'url(./assets/image/IDE.svg)',
    },
    {
      id: 6,
      name: 'Git',
      background: 'url(./assets/image/Git.svg)',
    },
    {
      id: 7,
      name: 'Telegram',
      background: 'url(./assets/image/Telegram.svg)',
    },
    {
      id: 8,
      name: 'Whatsapp',
      background: 'url(./assets/image/Whatsapp.svg)',
    },

  ];
  toggleFlag: boolean;
  toggleFlagTwo: boolean;
  public itemsConnected = [];


  updown__() {
    this.toggleFlagTwo = !this.toggleFlagTwo;
  }

  updown() {
    this.toggleFlag = !this.toggleFlag;
  }


  add(item) {
    this.itemsConnected.push(item);
    this.itemsAdd.forEach((itemAdd, i) => {
      if (itemAdd.id === item.id) {
        this.itemsAdd.splice(i, 1);
      }
    });
  }

  constructor() {

  }

  ngOnInit() {
    this.toggleFlag = true;
    this.toggleFlagTwo = true;
  }

  function() {
    this.notification.showNotification('success', 'New integration added.');
  }

}
