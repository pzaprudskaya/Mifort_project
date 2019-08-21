import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {MatDialog} from '@angular/material';
import {AddEmployeePopUpComponent} from '../add-employee-pop-up/add-employee-pop-up.component';
import {Profile, TimeSheetForApproval} from '../../profile-page/profile/profile.model';
import {EmployeesService} from './employee.service';
import {EmployeesProfileService} from '../../profile-page/profile/employees-profile.service';
import {TimelogsByWeekService} from '../../timesheets/by-week/timelogs-by-week.service';
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
  arrayPeriod = [];
barChart;
  dataDonut = [];
  logs: any[];
  timesheetWorkload: any[];
  employeeProjects: any[];
  timesheetsPendingApproval: any[] = [];
  period: string;
  employeeName: string;
  toggleFlag: boolean;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private employeeService: EmployeesService,
              private employeesProfileService: EmployeesProfileService) {
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
          debugger;
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
  }


    open_information() {
    this.toggleFlag = !this.toggleFlag;
  }
    deactivateEmployee(employee) {
    employee.status = 'deactivated';
    this.employeeService.updateTwo(employee)
      .subscribe(() => console.log('Update!'));
  }
    save() {
    debugger;
    this.employeesProfileService.update(this.employee)
      .subscribe(() => console.log('Update!'));
  }

}
