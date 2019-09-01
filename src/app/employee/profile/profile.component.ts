import {Component, OnInit} from '@angular/core';
import {Profile} from '../employee.model';
import {Donut} from '../../timesheets/by-week/timelog.model';
import {EmployeesService} from '../employee.service';
import {UserService} from '../../core/logo-user-company/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  roles = ['Project Manager', 'Employee', 'HR Manager', 'Owner', 'Admin'];
  employee: Profile;
  timelogs;
  barChart;
  dataDonut = [];
  logs: any[];
  timesheetWorkload: any[];
  employeeProjects: any[];
  timesheetsPendingApproval: any[] = [];
  timesheetsCurrentWeek: any[] = [];
  period: string;
  currentWeek: string;
  MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(private employeeService: EmployeesService, private userService: UserService) { }
  ngOnInit(): void {
    this.inputEvent();
    this.timesheetWorkload = [];
    this.employeeProjects = [];
    this.userService.userName$.subscribe((name) => {
      this.employeeService.getEmployee(name).subscribe(
        (employee: Profile) => {

          this.employee = employee[0];
          this.barChart = this.employee.yearsWorkload;
          this.employee.employeeProjects.forEach((project) => {
            this.employeeProjects.push(project);
          });
          this.employee.timesheetsPendingApproval.forEach((data) => {
            if (data.status === 'Submit to approval') {
              data.logs.forEach((item) => {
                const actual = item.time.reduce((itemOne, itemTwo) => itemOne + itemTwo);
                const [employeeProject] = this.employeeProjects.filter(project => project.name === item.projectName);
                const donut = new Donut(item.projectName, item.color, actual, employeeProject.time);
                this.dataDonut.push(donut);
              });
              this.timesheetsPendingApproval.push({
                timelog: data,
                dataDonut: this.dataDonut
              });
              this.dataDonut = [];
            }
            if (data.period === this.currentWeek) {
              data.logs.forEach((item) => {
                const actual = item.time.reduce((itemOne, itemTwo) => itemOne + itemTwo);
                const [employeeProject] = this.employeeProjects.filter(project => project.name === item.projectName);
                const donut = new Donut(item.projectName, item.color, actual, employeeProject.time);
                this.dataDonut.push(donut);
              });
              this.timesheetsCurrentWeek.push({
                timelog: data,
                dataDonut: this.dataDonut
              });
              this.dataDonut = [];
            }
          });
        });
    });
  }

  inputEvent(): void {
    const start = new Date();
    start.setDate(start.getDate() - start.getDay());

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    this.currentWeek = this.setDate(start, end);
  }
  setDate(start, end) {
    if (this.MONTH[start.getMonth()] === this.MONTH[end.getMonth()]) {
      return `${start.getDate()} - ${end.getDate()} ${this.MONTH[end.getMonth()]}`;
    }
    return `${start.getDate()} ${this.MONTH[start.getMonth()]} - ${end.getDate()} ${this.MONTH[end.getMonth()]}`;
  }
}
