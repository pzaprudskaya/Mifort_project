import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AddEmployeePopUpComponent} from '../add-employee-pop-up/add-employee-pop-up.component';
import {Profile} from '../employee.model';
import {EmployeesService} from '../employee.service';
import {Donut} from '../../timesheets/by-week/timelog.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.sass']
})

export class AddEmployeeComponent implements OnInit {
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
  employeeName: string;
  toggleFlag: boolean;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private employeeService: EmployeesService) {
  }

  changeDeactivatePopupCondition() {
    const dialogRef = this.dialog.open(AddEmployeePopUpComponent, {data: {name: this.employee.name}});
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deactivateEmployee(this.employee);
      }
    });
  }


  ngOnInit() {
    this.timesheetWorkload = [];
    this.employeeProjects = [];
    this.employeeName = this.route.snapshot.params.employee_name;
    this.employeeService.getEmployee(this.employeeName).subscribe(
      employee => {
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
          if (data.status === 'Current Week') {
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
  }


  openInformation() {
    this.toggleFlag = !this.toggleFlag;
  }

  deactivateEmployee(employee) {
    employee.status = 'deactivated';
    this.employeeService.updateTwo(employee).subscribe(() => console.log('Update!'));
  }

  save() {
    this.employeeService.update(this.employee).subscribe(() => console.log('Update!'));
  }

}
