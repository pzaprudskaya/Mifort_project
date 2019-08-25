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
  period: string;
  employeeName: string;


  constructor(private employeeService: EmployeesService, private userService: UserService) { }
  ngOnInit(): void {
    this.timesheetWorkload = [];
    this.employeeProjects = [];
    this.userService.userName$.subscribe((name) => {
      debugger;
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
                const donut = new Donut(item.projectName, item.color, actual);
                this.dataDonut.push(donut);
              });
              this.timesheetsPendingApproval.push({
                timelog: data,
                dataDonut: this.dataDonut
              });
              this.dataDonut = [];
            }
          });
        });
    });
  }
}
