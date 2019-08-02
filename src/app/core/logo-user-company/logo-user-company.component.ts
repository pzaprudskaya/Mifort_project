import { UserService } from './../../user.service';
import {Component, Input, OnInit} from '@angular/core';
import {EmployeesProfileService} from '../../profile-page/profile/employees-profile.service';
import {TableService} from '../../components/table/table.service';
@Component({
  selector: 'app-logo-user-company',
  templateUrl: './logo-user-company.component.html',
  styleUrls: ['./logo-user-company.component.sass']
})
export class LogoUserCompanyComponent implements OnInit {
  photo: string;
  users: string[] = ['Polina Zaprudskaya', 'Egor Drozd', 'Vasiliy Pupanov'];
  companys: string[];
  nameOption: string;
  companyOption: string ;
  user;

  constructor(private employeesProfileService: EmployeesProfileService, 
    private tableService: TableService,
    private userService: UserService) { }

    changeName(){   
      this.userService.getUser(this.nameOption).subscribe(
        user => {
          this.user = user[0];
          this.companys = this.user.company;
        });
    }
    changeProject(){
      console.log(this.companyOption)
    }
  
  ngOnInit() {
    this.userService.getUser(this.users[0]).subscribe(
      user => {
        this.user = user[0];
        this.companys = this.user.company;
      });
    this.photo = '';
    this.nameOption = this.users[0];
    this.companyOption = this.companys[0];
    this.employeesProfileService.getName(this.nameOption);
    this.tableService.getNameCompany(this.companyOption);
    this.employeesProfileService.getEmployee().subscribe(
      employee => {
        this.photo = employee[0].photoUrl;
      });
  }



}
