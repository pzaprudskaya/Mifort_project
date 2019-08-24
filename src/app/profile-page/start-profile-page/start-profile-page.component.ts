import { Component, OnInit, Input } from '@angular/core';
import {EmployeesProfileService} from '../profile/employees-profile.service';
import {Profile} from '../profile/profile.model';
import { StartProfileService } from './start-profile.service';

@Component({
  selector: 'app-start-profile-page',
  templateUrl: './start-profile-page.component.html',
  styleUrls: ['./start-profile-page.component.sass']
})
export class StartProfilePageComponent implements OnInit {

  @Input() employee: Profile;
  @Input() employeeProjects: any[];
  logsOne: any[];
  period: string;
  inputValue: string = '';
  constructor(private employeesProfileService: EmployeesProfileService, private startProfileService: StartProfileService) { }

  ngOnInit() {
    this.employeesProfileService.getEmployee().subscribe(
      employee => {
        this.employee = employee[0];
        this.employee.employeeProjects.forEach((project) => {
          this.employeeProjects.push(project);
        });
      }
    );
    console.log(this.employee.photoUrl)
  }
  sendEmail(value){
    let user = {
      email: value,
    }
    this.startProfileService.sendEmail(user).subscribe(
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
  }
}
