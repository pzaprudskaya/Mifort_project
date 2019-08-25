import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TimelogsByWeekService} from './timelogs-by-week.service';
import {Timelog, Donut} from './timelog.model';
import {EmployeesService} from '../../employee/employee.service';
import {Profile} from '../../employee/employee.model';
import {UserService} from '../../core/logo-user-company/user.service';

@Component({
  selector: 'app-by-week',
  templateUrl: './by-week.component.html',
  styleUrls: ['./by-week.component.sass']
})
export class ByWeekComponent implements OnInit {
  MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  period: string;
  timelogs: Timelog;
  employee: Profile;
  logs: any;
  timeNow: string;
  toggleFlag: boolean;
  date: string;
  router: string;
  submit: string;
  isShown = true;
  timelogByPeriod: any[];
  dataDonut = [];
  constructor(private timelogsByWeekService: TimelogsByWeekService,
              private userService: UserService,
              private employeesService: EmployeesService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.toggleFlag = true;
    this.period = 'select';
    const today = new Date( );
    this.timelogByPeriod = [];
    this.userService.userName$.subscribe((userName) => {
      this.timelogsByWeekService.getLogs(userName).subscribe(
        timelogs => {
          [this.timelogs] = timelogs;
          this.timelogs.data.forEach((data) => {
              data.logs.forEach((item) => {
                const actual = item.time.reduce((itemOne, itemTwo) => itemOne + itemTwo);
                const donut = new Donut(item.projectName, item.color, actual);
                this.dataDonut.push(donut);
              });
              this.timelogByPeriod.push({
                timelog: data,
                dataDonut: this.dataDonut
              });
              this.dataDonut = [];
          });
          this.employeesService.getEmployee(userName).subscribe(employee => {
            this.employee = employee[0];
          });
          this.inputEvent(today);
          this.filterByPeriod(this.period);
        });
    });
  }
  updateTimelogs() {
    let arr: any = [];
    arr = this.timelogByPeriod.map(item => {
      return item.timelog;
    });
    const myTimelog = new Timelog(this.timelogs.name, arr);
    this.timelogsByWeekService.update(myTimelog).subscribe(() => console.log('Update'));

    this.employee.timesheetsPendingApproval = arr;
    this.employeesService.update(this.employee).subscribe(() => console.log('Update'));
  }

  filterByPeriod(period: string) {
    [this.logs] = this.timelogByPeriod.filter((item) => item.timelog.period === period );
    if (this.logs === undefined) {
      this.isShown = false;
      this.changeDetector.detectChanges();
      this.logs = {timelog: {period: this.period, logs: [], status: '', comment: ''}, dataDonut: []};
      this.timelogByPeriod.push(this.logs);
      this.isShown = true;
      this.changeDetector.detectChanges();
    } else {
      this.isShown = false;
      this.changeDetector.detectChanges();
      this.logs = this.logs;
      this.isShown = true;
      this.changeDetector.detectChanges();
    }
    if (this.logs.timelog.status === '') {
      this.submit = 'Submit to approval';
    } else {
      this.submit = 'Resubmit to approval';
    }
  }
  inputEvent(date): void {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    this.period = this.setDate(start, end);
    this.filterByPeriod(this.period);
  }
  setDate(start, end) {
    if (this.MONTH[start.getMonth()] === this.MONTH[end.getMonth()]) {
      return `${start.getDate()} - ${end.getDate()} ${this.MONTH[end.getMonth()]}`;
    }
    return `${start.getDate()} ${this.MONTH[start.getMonth()]} - ${end.getDate()} ${this.MONTH[end.getMonth()]}`;
  }
  time() {
    this.toggleFlag = false;
    const now = new Date();
    this.timeNow = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    this.updateTimelogs();
  }
  submitToAproval() {
    this.submit = 'Resubmit to approval';
    this.logs.timelog.status = 'Submit to approval';
    this.updateTimelogs();
  }
}
