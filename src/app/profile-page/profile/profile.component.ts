import {Component, OnInit, Input} from '@angular/core';
import {EmployeesProfileService} from './employees-profile.service';
import {Profile} from './profile.model';
import {TimeSheetForApproval} from './profile.model';

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

  constructor(private employeesProfileService: EmployeesProfileService) { }

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


}
