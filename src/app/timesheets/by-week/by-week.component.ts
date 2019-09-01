import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TimelogsByWeekService} from './timelogs-by-week.service';
import {Timelog, Donut} from './timelog.model';
import {EmployeesService} from '../../employee/employee.service';
import {Profile} from '../../employee/employee.model';
import {UserService} from '../../core/logo-user-company/user.service';
import {EmployeesTableService} from '../../employee/employees-page/employees-table.service';

@Component({
  selector: 'app-by-week',
  templateUrl: './by-week.component.html',
  styleUrls: ['./by-week.component.sass']
})
export class ByWeekComponent implements OnInit {
  MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  period: string;
  flag = false;
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
  currentWeek: string;
  dataDonut = [];
  isButtonSubmit: boolean;
  user;
  fullTotal: number;

  constructor(private timelogsByWeekService: TimelogsByWeekService,
              private userService: UserService,
              private employeesService: EmployeesService,
              private employeesTableService: EmployeesTableService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.toggleFlag = true;
    this.period = 'select';
    const today = new Date();
    this.timelogByPeriod = [];
    this.userService.userName$.subscribe((userName) => {
      this.employeesTableService.getUser(name).subscribe((user) => {
        this.user = user[0];
      });
      this.employeesService.getEmployee(userName).subscribe(employee => {
        this.employee = employee[0];
      });
      this.timelogsByWeekService.getLogs(userName).subscribe(
        timelogs => {
          [this.timelogs] = timelogs;
          this.timelogs.data.forEach((data) => {
            data.logs.forEach((item) => {
              const actual = item.time.reduce((itemOne, itemTwo) => itemOne + itemTwo);
              const [employeeProject] = this.employee.employeeProjects.filter(project => project.name === item.projectName);
              const donut = new Donut(item.projectName, item.color, actual, employeeProject.time);
              this.dataDonut.push(donut);
            });
            this.timelogByPeriod.push({
              timelog: data,
              dataDonut: this.dataDonut
            });
            this.dataDonut = [];
          });
          this.inputEvent(today);
          this.currentWeek = this.period;
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
    this.flag = false;
    [this.logs] = this.timelogByPeriod.filter((item) => item.timelog.period === period);
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
    if (this.period === this.currentWeek) {
      this.isButtonSubmit = false;
      this.submitToAproval();
    } else {
      if (this.logs.timelog.status === '') {
        this.submit = 'Submit to approval';
        this.isButtonSubmit = true;
      } else if (this.logs.timelog.status === 'Submitted' || this.logs.timelog.status === 'Forgot') {
        this.isButtonSubmit = false;
      } else {
        this.submit = 'Resubmit to approval';
        this.isButtonSubmit = true;

      }
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
    if (this.logs.timelog.period === this.period) {
      this.logs.timelog.status = '';
    } else {
      this.submit = 'Resubmit to approval';
      this.logs.timelog.status = 'Submit to approval';
    }

    this.fullTotal = 0;
    this.logs.timelog.logs.forEach((log) => {
      this.fullTotal += log.time.reduce((acc, value) => acc + value, 0);
    });
    if (this.user.pendingApprovalTimesheets.length === 0) {
      this.user.pendingApprovalTimesheets.push({period: this.period, actual: this.fullTotal, planned: 40});
    } else {
      this.user.pendingApprovalTimesheets = this.user.pendingApprovalTimesheets.map((item) => {
        if (item.period === this.period) {
          this.flag = true;
          return {period: item.period, actual: this.fullTotal, planned: 40};
        } else {
          return item;
        }
      });
      if (this.flag === false) {
        this.user.pendingApprovalTimesheets.push({period: this.period, actual: this.fullTotal, planned: 40});
      }
    }
    this.employeesTableService.updateUser(this.user).subscribe(() => console.log('Update'));
    this.updateTimelogs();
  }
}
