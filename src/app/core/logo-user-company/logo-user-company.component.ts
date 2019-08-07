import { UserService } from './user.service';
import {Component, OnInit} from '@angular/core';
import {EmployeesProfileService} from '../../profile-page/profile/employees-profile.service';
import {TableService} from '../../components/table/table.service';
import {User} from './user.model';
@Component({
  selector: 'app-logo-user-company',
  templateUrl: './logo-user-company.component.html',
  styleUrls: ['./logo-user-company.component.sass']
})
export class LogoUserCompanyComponent implements OnInit {
  photo: string;
  users: string[] = ['Polina Zaprudskaya', 'Polina Zaprudskaya (young)'];
  companies: string[];
  nameOption: string;
  companyOption: string ;
  user: User;
  name: string;

  constructor(private employeesProfileService: EmployeesProfileService,
              private tableService: TableService,
              private userService: UserService) { }

  ngOnInit() {
    this.photo = '';
    this.nameOption = this.users[0];
    this.userService.getUser(this.users[0]).subscribe(
      user => {
        this.user = user[0];
        this.companies = this.user.companies;
      });
    this.employeesProfileService.getName(this.nameOption);
    this.tableService.getNameCompany(this.companyOption);
    this.employeesProfileService.getEmployee().subscribe(
      employee => {
        this.photo = employee[0].photoUrl;
      });
  }
  changeName() {
    this.userService.getUser(this.nameOption).subscribe(
      user => {
        this.user = user[0];
        this.companies = this.user.companies;
      });
    console.log(this.nameOption);
    this.employeesProfileService.getName(this.nameOption);
    this.employeesProfileService.getEmployee().subscribe(
      employee => {
        this.photo = employee[0].photoUrl;
      });
  }
  changeProject() {
    console.log(this.companyOption);
  }

}
