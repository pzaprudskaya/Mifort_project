import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Donut, Timelog} from './timelog.model';
import {TimelogsByDayService} from './timelogs-by-day.service';

@Component({
  selector: 'app-by-day',
  templateUrl: './by-day.component.html',
  styleUrls: ['./by-day.component.sass']
})
export class ByDayComponent implements OnInit {
  @Output() changePeriod: EventEmitter<string> = new EventEmitter<string>();
  timeNow: string;
  toggleFlag: boolean;
  date: string;
  chooseDate;
  router: string;
  save: string;
  period: string;
  logs: any[];
  timelogs: Timelog;
  dataDonut: Donut[];
  arrayDay: any[];
  month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  constructor(private timelogsByDayService: TimelogsByDayService) { }

  ngOnInit() {
    this.timeNow = '';
    this.save = '';
    this.toggleFlag = true;
    const today = new Date( );
    this.date = today.getDate() + '/' + this.month[today.getMonth()] + '/' + today.getFullYear();
    this.chooseDate = today;
    this.period = 'select';

    this.timelogsByDayService.getLogs().subscribe(
      timelogs => {
        this.arrayDay = [];
        this.logs = [];
        this.timelogs = timelogs[0];
        this.timelogs.data.forEach((data) => {
          this.arrayDay.push(Object.keys(data).map((key) => {
            if (key === 'logs') {
              const logs = [];
              data.logs.forEach((log) => {
                logs.push(log);
              });
              return logs;
            } else {
              return data[key];
            }
          }));

        });
        this.filterByDay(this.date);
      });
  }
  updateTimelogs() {
    let arr = [];
    arr = this.timelogs.data.map(obj => {
        if (obj.day === this.logs[0][0]) {
          return {day: obj.day, logs: this.logs[0][1]};
        } else {
          return obj;
        }
      });
    const myTimelog = new Timelog(this.timelogs.name, arr);

    this.timelogsByDayService.update(myTimelog)
      .subscribe(() => console.log('Update!'));
  }
  filterByDay(day) {
    debugger;
    this.dataDonut = [];
    this.logs = this.arrayDay.filter((arr) => arr[0] === day );
    this.logs[0][1].forEach((item) => {
      this.dataDonut.push(new Donut(item.projectName, item.color, item.time));
    });


  }

  saveLogs() {
    this.toggleFlag = false;
    const now = new Date();
    this.timeNow = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    this.updateTimelogs();
  }
  prevDate() {
    this.chooseDate.setDate(this.chooseDate.getDate() - 1);
    this.date = this.chooseDate.getDate() + '/' + this.month[this.chooseDate.getMonth()] + '/' + this.chooseDate.getFullYear();
    debugger;
    this.filterByDay(this.date);
  }
  nextDate() {
    this.chooseDate.setDate(this.chooseDate.getDate() + 1);
    this.date = this.chooseDate.getDate() + '/' + this.month[this.chooseDate.getMonth()] + '/' + this.chooseDate.getFullYear();
    this.filterByDay(this.date);
  }


}
