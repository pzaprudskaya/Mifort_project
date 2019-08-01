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
  @Input() name: string;
  @Input() value: string;
  photo: string;
  users = ['Polina Zaprudskaya', 'Egor Drozd', 'Vasiliy Pupanov'];
  companys: string[] = ['2', '232'];
  option: string = this.users[0];
  optionCompany: string = this.companys[0];

  user;


  constructor(private employeesProfileService: EmployeesProfileService, 
    private tableService: TableService,
    private userService: UserService) { }

    changeName(){   
      this.userService.getUser(this.option).subscribe(
        user => {
          this.user = user[0];
          this.companys = this.user.company;
        });
      
      console.log(this.user);
    }
    changeProject(){
      console.log(this.optionCompany)
    }
  
  ngOnInit() {
    this.photo = '';
    this.name = 'Polina Zaprudskaya';
    this.employeesProfileService.getName(this.name);
    this.value = 'Mifort';
    this.tableService.getNameCompany(this.value);
    this.employeesProfileService.getEmployee().subscribe(
      employee => {
        this.photo = employee[0].photoUrl;
      });
  }



}
