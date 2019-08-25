import { UserService } from './user.service';
import {Component, OnInit} from '@angular/core';
import {User} from './user.model';
import {EmployeesService} from '../../employee/employee.service';


@Component({
  selector: 'app-logo-user-company',
  templateUrl: './logo-user-company.component.html',
  styleUrls: ['./logo-user-company.component.sass']
})
export class LogoUserCompanyComponent implements OnInit {
  photo: string;
  userName = 'Polina Zaprudskaya';
  companies: string[];
  companyOption: string ;
  user: User;
  name: string;

  constructor(private employeesProfileService: EmployeesService,
              private userService: UserService) { }

  ngOnInit() {
    this.photo = '';
    this.userService.getUser(this.userName).subscribe(
      user => {
        this.user = user[0];
        this.companies = this.user.companies;
        this.companyOption = this.companies[0];
        this.userService.updateName(this.user.name);
        this.userService.updateCompany(this.companyOption);
      });
    this.employeesProfileService.getEmployee(this.userName).subscribe(
      employee => {
        this.photo = employee[0].photoUrl;
      });
  }

  changeProject() {
    this.userService.updateCompany(this.companyOption);
  }
}
