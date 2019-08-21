import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {MatDialog} from '@angular/material';
import {AddEmployeePopUpComponent} from '../add-employee-pop-up/add-employee-pop-up.component';
import {Profile, TimeSheetForApproval} from '../../profile-page/profile/profile.model';
import {EmployeesService} from './employee.service';
import {EmployeesProfileService} from '../../profile-page/profile/employees-profile.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.sass']
})
export class AddEmployeeComponent implements OnInit {
  roles = ['Project Manager', 'Employee', 'HR Manager', 'Owner', 'Admin'];
  employee: Profile;
  logs: any[];
  timesheetWorkload: any[];
  employeeProjects: any[];
  barChart: any[];
  logsTwo: any[];
  logsOne: any[];
  timesheetsPendingApproval: any[];
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

    this.logs = [];
    this.timesheetWorkload = [];
    this.employeeProjects = [];
    this.logsOne = [];
    this.barChart = [];
    this.timesheetsPendingApproval = [];
    this.period = '';
    this.employeeName = this.route.snapshot.params.employee_name;

    this.employeeService.getEmployee(this.employeeName).subscribe(
      employee => {

        this.employee = employee[0];
        this.barChart = this.employee.yearsWorkload;
        this.employee.employeeProjects.forEach((project) => {
          this.employeeProjects.push(project);
        });
        this.employee.timesheetsPendingApproval.forEach((item) => {

          this.period = item.period;

          item.dataForApproval.forEach((it) => {
            this.logsOne.push(it.logs);
            this.timesheetWorkload.push(it.timesheetWorkload);
          });
          this.logsOne.forEach((arr) => {
            this.logs.push(arr);
            this.logsOne = [];
          });
          const timesheetForApproval = new TimeSheetForApproval(this.period, this.logs, this.timesheetWorkload);
          this.timesheetsPendingApproval.push(timesheetForApproval);
          this.period = '';
          this.logs = [];
          this.timesheetWorkload = [];
        });

      }
    );
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
    this.employeesProfileService.update(this.employee)
      .subscribe(() => console.log('Update!'));
  }
}
