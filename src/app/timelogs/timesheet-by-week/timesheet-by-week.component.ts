import {Component, Input, OnInit} from '@angular/core';
import {Timelog} from '../timesheet-by-week/timelog.model';
import {TimelogsByWeekService} from '../timesheet-by-week/timelogs.service';

@Component({
  selector: 'app-timesheet-by-week',
  templateUrl: './timesheet-by-week.component.html',
  styleUrls: ['./timesheet-by-week.component.sass']
})
export class TimesheetByWeekComponent implements OnInit {
  period: string;
  arrayPeriod: any[];
  timelogs: Timelog;
  save: string;
  logs: any[];
  constructor(private timelogsService: TimelogsByWeekService) { }

  ngOnInit() {
    const today = new Date( );
    this.arrayPeriod = [];
    this.timelogsService.getLogs().subscribe(
      timelogs => {
        this.timelogs = timelogs[0];
        debugger;
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
    this.timelogsService.update(this.timelogs)
      .subscribe(() => console.log('Update!'));
  }
  filterByPeriod(event) {
    debugger;
    this.logs = this.arrayPeriod.filter((arr) => arr[0] === event );
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
  }
}
