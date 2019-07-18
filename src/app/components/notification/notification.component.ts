import {Component, OnInit, ViewChild} from '@angular/core';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit {
  @ViewChild('customTemplate') customNotificationTmpl;

  ngOnInit(){}


  public constructor(private notifier: NotifierService) {
    this.notifier = notifier;
  }

  public showNotification(type: string, message: string): void {
    debugger;
    this.notifier.notify(type, message);

  }

  public hideOldestNotification(): void {
    this.notifier.hideOldest();
  }

  public hideNewestNotification(): void {
    this.notifier.hideNewest();
  }

  public hideAllNotifications(): void {
    this.notifier.hideAll();
  }

  public showCustomNotificationTemplate(
    type: string,
    message: string,
    id: string
  ): void {
    this.notifier.show({
      id,
      message,
      type,
      template: this.customNotificationTmpl
    });
  }


  public showSpecificNotification(type: string, message: string, id: string): void {
    this.notifier.show({ id, message, type });
  }


  public hideSpecificNotification(id: string): void {
    this.notifier.hide(id);
  }




}
