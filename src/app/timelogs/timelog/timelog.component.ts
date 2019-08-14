
import { Component, OnInit, Input } from '@angular/core';
import {TimelogsService} from './timelogs.service';
import {Timelog} from './timelog.model';

@Component({
  selector: 'app-timelog',
  templateUrl: './timelog.component.html',
  styleUrls: ['./timelog.component.sass']
})
export class TimelogComponent implements OnInit {

  logs: any[];
  timelogs: Timelog;
  save: string;
  arrayDay: any[];
  date: string;
  month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  constructor(private timelogsService: TimelogsService) { }

  ngOnInit() {
    const today = new Date( );
    this.date = today.getDate() + '/' + this.month[today.getMonth()] + '/' + today.getFullYear();

    this.timelogsService.getLogs().subscribe(
      timelogs => {
        this.arrayDay = [];
        this.logs = [];
        this.timelogs = timelogs[0];
        debugger;
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

    this.timelogsService.update(this.logs)
      .subscribe(() => console.log('Update!'));
  }
  filterByDay(day) {
    debugger;
    this.logs = this.arrayDay.filter((arr) => arr[0] === day );
    console.log(this.logs[1]);
  }

}
