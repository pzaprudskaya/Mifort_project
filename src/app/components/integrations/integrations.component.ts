import {AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.sass']
})
export class IntegrationsComponent implements OnInit, AfterViewInit{
  public items__add = [
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
  toggleFlag: boolean = true;
  toggleFlag__: boolean = true;
  public items__connected = [];

  public message: string = ''

  updown__() {
    this.toggleFlag__ = !this.toggleFlag__;
  }
  updown() {
    this.toggleFlag = !this.toggleFlag;
  }


  add(item){
    this.items__connected.push(item);
    this.items__add.forEach((item__add, i) => {
      if (item__add.id === item.id) {
        this.items__add.splice(i, 1)
      }
    })
  }
  constructor() {

  }

  ngOnInit() {

  }
  ngAfterViewInit(): void {
    let buttons = document.getElementsByClassName('polina');
    //let text = <HTMLElement> document.querySelector('.notifications');
    fromEvent(buttons, 'click').subscribe(e => {
      console.log("Click");
      //text.innerText = "New integration added.";
      this.message = "New integration added.";
    })
  }

}
