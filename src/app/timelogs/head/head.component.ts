import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.sass']
})
export class HeadComponent implements OnInit {
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  @Output() changePeriod: EventEmitter<string> = new EventEmitter<string>();
  timeNow: string;
  toggleFlag: boolean;
  date: string;
  chooseDate;
  router: string;
  save: string;
  period: string;
  month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  constructor( private routerName: ActivatedRoute) {
  }

  ngOnInit() {
    this.router = this.routerName.snapshot.routeConfig.path;
    this.timeNow = '';
    this.save = '';
    this.toggleFlag = true;
    const today = new Date( );
    this.date = today.getDate() + '/' + this.month[today.getMonth()] + '/' + today.getFullYear();
    this.chooseDate = today;
    this.period = 'select';
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
  inputEvent(event) {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const start = new Date(event.value);
    start.setDate(start.getDate() - start.getDay());

    const end = new Date(event.value);
    end.setDate(start.getDate() + 6);
    if (month[start.getMonth()] === month[end.getMonth()]) {
      this.period = start.getDate() + ' - ' + end.getDate() + ' ' + month[end.getMonth()];
    } else {
      this.period = start.getDate() + ' ' + month[start.getMonth()] + ' - ' + end.getDate() + ' ' + month[end.getMonth()];
    }
    this.change.emit(this.period);
  }

}
