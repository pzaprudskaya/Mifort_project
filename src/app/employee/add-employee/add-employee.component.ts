import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {MatDialog} from '@angular/material';
import {AddEmployeePopUpComponent} from '../add-employee-pop-up/add-employee-pop-up.component';
import {Profile, TimeSheetForApproval} from '../../profile-page/profile/profile.model';
import {EmployeesService} from './employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.sass']
})
export class AddEmployeeComponent implements OnInit {
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
    this.logs = [];
    this.timesheetWorkload = [];
    this.employeeProjects = [];
    this.logsTwo = [];
    this.logsOne = [];
    this.barChart = [];
    this.timesheetsPendingApproval = [];
    this.period = '';
    this.toggleFlag = false;


    this.employeeName = this.route.snapshot.params.employeeName;
    this.employeeService.getName(this.employeeName);

    this.employeeService.getEmployee().subscribe(
      employee => {

        this.employee = employee[0];
        this.barChart = this.employee.yearsWorkload;
        this.employee.employeeProjects.forEach((project) => {
          this.employeeProjects.push(Object.keys(project).map((key) => {
            return project[key];
          }));
        });


        this.employee.timesheetsPendingApproval.forEach((item) => {

          this.period = item.period;

          item.dataForApproval.forEach((it) => {
            this.logsOne.push(Object.keys(it.logs).map((i) => {
              return it.logs[i];
            }));
            this.timesheetWorkload.push(it.timesheetWorkload);
          });
          this.logsOne.forEach((arr) => {
            for (let i = 0; i < arr.length; i++) {
              if (i === 2) {
                arr[i].forEach((element) => {
                  this.logsTwo.push(element);
                });
              } else {
                this.logsTwo.push(arr[i]);
              }
            }
            this.logs.push(this.logsTwo);
            this.logsTwo = [];
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


}
