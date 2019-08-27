import {Component, OnInit, Input} from '@angular/core';
import {EmployeesProfileService} from './employees-profile.service';
import {Profile} from './profile.model';
import {TimeSheetForApproval} from './profile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  @Input() employee: Profile;
  @Input() logs: any[];
  @Input() timesheetWorkload: any[];
  @Input() employeeProjects: any[];
  @Input() barChart: any[];
  logsOne: any[];
  timesheetsPendingApproval: any[];
  period: string;
  employeeProjectsState: boolean = true;
  employeeName: string;
  constructor(private employeesProfileService: EmployeesProfileService, private router: Router) { }

  ngOnInit() {

    this.logs = [];
    this.timesheetWorkload = [];
    this.employeeProjects = [];
    this.logsOne = [];
    this.barChart = [];
    this.timesheetsPendingApproval = [];
    this.period = '';
    this.employeesProfileService.getEmployee().subscribe(
      employee => {
        this.employee = employee[0];
        this.barChart = this.employee.yearsWorkload;
        this.employee.employeeProjects.forEach((project) => {
          this.employeeProjects.push(project);
        });
        if(this.employee.employeeProjects.length < 1 || !this.employee.employeeProjects){
          this.employeeProjectsState = false;
        }
        else{ 
          this.employeeProjectsState = false;
        }
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
  sendEmail(value){
    let user = {
      email: value,
      name: this.employee.name,
    }
    this.employeesProfileService.sendEmail(user).subscribe(
      data => {
        let res: any = data; 
        console.log(
          `👏 > 👏 > 👏 > 👏  is successfully register and mail has been sent and the message id is `
        );
      },
      err => {
        console.log(err);
      }
    );
    alert('The letter was sent');
  }
  createCompany(){
    this.router.navigate(['/company-settings'])
  }
}
