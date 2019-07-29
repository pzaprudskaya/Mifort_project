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
  constructor(private employeesProfileService: EmployeesProfileService, private tableService: TableService) { }

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
