import { Component, OnInit } from '@angular/core';
import {TimelogsByWeekService} from './timelogs-by-week.service';
import {Timelog, Donut} from './timelog.model';
import {EmployeesService} from '../../employee/add-employee/employee.service';
import {Profile} from '../../profile-page/profile/profile.model';

@Component({
  selector: 'app-by-week',
  templateUrl: './by-week.component.html',
  styleUrls: ['./by-week.component.sass']
})
export class ByWeekComponent implements OnInit {
  period: string;
  arrayPeriod: any[];
  timelogs: Timelog;
  employee: Profile;
  logs: any[];
  timeNow: string;
  toggleFlag: boolean;
  date: string;
  router: string;
  dataDonut: Donut[];
  submit: string;
  constructor(private timelogsByWeekService: TimelogsByWeekService,
              private employeesService: EmployeesService) { }

  ngOnInit() {

    this.toggleFlag = true;
    this.period = 'select';
    const today = new Date( );
    this.arrayPeriod = [];
    this.timelogsByWeekService.getLogs().subscribe(
      timelogs => {
      this.timelogs = timelogs[0];
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
      this.employeesService.getEmployee(this.timelogs.name).subscribe(employee => {
          this.employee = employee[0];

        });
      this.inputEvent(today);
      this.filterByPeriod(this.period);
      });

  }
  updateTimelogs() {
    let arr: any = [];
    arr = this.timelogs.data.map(obj => {
      if (obj.period === this.logs[0][0]) {
        return {period: obj.period, logs: this.logs[0][1], status: this.logs[0][2], comment: this.logs[0][3]};
      } else {
        return obj;
      }
    });
    const myTimelog = new Timelog(this.timelogs.name, arr);
    this.timelogsByWeekService.update(myTimelog)
      .subscribe(() => console.log('Update!'));
    debugger;

    this.employee.timesheetsPendingApproval = arr;
    this.employeesService.update(this.employee).subscribe(() => console.log('Update!'));
  }
  filterByPeriod(event) {
    this.dataDonut = [];
    this.logs = this.arrayPeriod.filter((arr) => arr[0] === event );
    if (this.logs === []) {
      this.logs = [event, [], '', '' ];
    } else {
      this.logs[0][1].forEach((item) => {
        const actual = item.time.reduce((itemOne, itemTwo) => itemOne + itemTwo);
        this.dataDonut.push(new Donut(item.projectName, item.color, actual));
      });
    }
    if (this.logs[0][2] === '') {
      this.submit = 'Submit to approval';
    } else {
      this.submit = 'Resubmit to approval';
    }

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
  submitToAproval() {
    this.submit = 'Resubmit to approval';
    this.logs[0][2] = 'Submit to approval';
    this.updateTimelogs();
  }
}
