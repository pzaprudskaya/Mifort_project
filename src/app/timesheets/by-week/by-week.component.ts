import { Component, OnInit } from '@angular/core';
import {TimelogsByWeekService} from './timelogs-by-week.service';
import {Timelog, Donut} from './timelog.model';

@Component({
  selector: 'app-by-week',
  templateUrl: './by-week.component.html',
  styleUrls: ['./by-week.component.sass']
})
export class ByWeekComponent implements OnInit {
  period: string;
  arrayPeriod: any[];
  timelogs: Timelog;
  logs: any[];
  timeNow: string;
  toggleFlag: boolean;
  date: string;
  router: string;
  name: string;
  dataDonut: Donut[];
  constructor(private timelogsByWeekService: TimelogsByWeekService) { }

  ngOnInit() {
    this.toggleFlag = true;
    this.period = 'select';
    const today = new Date( );
    this.arrayPeriod = [];
    this.timelogsByWeekService.getLogs().subscribe(
      timelogs => {
      this.timelogs = timelogs[0];
      this.name = this.timelogs.name;
      this.timelogs.data.forEach((data) => {
          this.arrayPeriod.push(Object.keys(data).map((key) => {
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
      this.inputEvent(today);
      this.filterByPeriod(this.period);
      });
  }
  updateTimelogs() {
    let arr = [];
    arr = this.timelogs.data.map(obj => {
      if (obj.period === this.logs[0][0]) {
        return {period: obj.period, logs: this.logs[0][1]};
      } else {
        return obj;
      }
    });
    const myTimelog = new Timelog(this.timelogs.name, arr);
    this.timelogsByWeekService.update(myTimelog)
      .subscribe(() => console.log('Update!'));
  }
  filterByPeriod(event) {
    this.dataDonut = [];
    this.logs = this.arrayPeriod.filter((arr) => arr[0] === event );
    this.logs[0][1].forEach((item) => {
      const actual = item.time.reduce((itemOne, itemTwo) => itemOne + itemTwo);
      this.dataDonut.push(new Donut(item.projectName, item.color, actual));
    });
    console.log(this.dataDonut);
  }
  inputEvent(event) {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const start = new Date(event);
    start.setDate(start.getDate() - start.getDay());

    const end = new Date(event);
    end.setDate(start.getDate() + 6);
    if (month[start.getMonth()] === month[end.getMonth()]) {
      this.period = start.getDate() + ' - ' + end.getDate() + ' ' + month[end.getMonth()];
    } else {
      this.period = start.getDate() + ' ' + month[start.getMonth()] + ' - ' + end.getDate() + ' ' + month[end.getMonth()];
    }
    this.filterByPeriod(this.period);
  }

  time() {
    this.toggleFlag = false;
    const now = new Date();
    this.timeNow = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    this.updateTimelogs();
  }
  changeDonutChart(event) {
    for(let i = 0; i < this.dataDonut.length; i++) {
        if(i === event.id - 1) {
          this.dataDonut[i].actual = event.actual;
        }
    }
  } 
}
