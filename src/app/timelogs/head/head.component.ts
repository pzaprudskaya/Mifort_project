import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.sass']
})
export class HeadComponent implements OnInit {
  timeNow: string;
  toggleFlag: boolean;

  constructor() {
  }

  ngOnInit() {
    this.timeNow = '';
    this.toggleFlag = true;
  }

  time() {
    this.toggleFlag = false;
    const now = new Date();
    this.timeNow = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  }
}
