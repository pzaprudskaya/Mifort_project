import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NotificationComponent} from '../notification/notification.component';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.sass']
})
export class IntegrationsComponent implements OnInit {
  @Input() connectedIntegration: any[];
  @Input() integrations: any[];
  @ViewChild('notification') notification: NotificationComponent;
  toggleFlag: boolean;
  toggleFlagTwo: boolean;


  updown__() {
    this.toggleFlagTwo = !this.toggleFlagTwo;
  }
  updown() {
    this.toggleFlag = !this.toggleFlag;
  }


  add(item) {
    this.connectedIntegration.push(item);
    this.integrations.forEach((integration, i) => {
      if (integration.id === item.id) {
        this.integrations.splice(i, 1);
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
