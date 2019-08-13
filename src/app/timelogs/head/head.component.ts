import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.sass']
})
export class HeadComponent implements OnInit {
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  timeNow: string;
  toggleFlag: boolean;
  date: string;
  chooseDate;
  save: string;
  month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  constructor() {
  }

  ngOnInit() {
    this.timeNow = '';
    this.save = '';
    this.toggleFlag = true;
    const today = new Date( );
    this.date = today.getDate() + '/' + this.month[today.getMonth()] + '/' + today.getFullYear();
    this.chooseDate = today;
  }

  time() {
    debugger;
    this.save = 'Save';
    this.toggleFlag = false;
    const now = new Date();
    this.timeNow = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    this.change.emit(this.save);
  }
  prevDate() {
    this.chooseDate.setDate(this.chooseDate.getDate() - 1);
    this.date = this.chooseDate.getDate() + '/' + this.month[this.chooseDate.getMonth()] + '/' + this.chooseDate.getFullYear();
  }
  nextDate() {
    this.chooseDate.setDate(this.chooseDate.getDate() + 1);
    this.date = this.chooseDate.getDate() + '/' + this.month[this.chooseDate.getMonth()] + '/' + this.chooseDate.getFullYear();
  }

}
