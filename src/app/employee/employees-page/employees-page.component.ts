import {Component, Input, OnInit} from '@angular/core';
import { EmployeesTableService } from './employees-table.service';
import {Employees, User} from './items.model';
import {Subject} from 'rxjs';
import {UserService} from '../../core/logo-user-company/user.service';


@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.sass']
})
export class  EmployeesPageComponent implements OnInit {
  companyName: string;
  roles = ['Project Manager', 'Employee', 'HR Manager', 'Owner', 'Admin'];
  roleOption = 'Project Manager';
  @Input() employeeName: string;
  flag: string;
  employees: Employees[];
  searchTerm$ = new Subject<string>();
  displayedColumns: string[];
  colors = ['#FF0000', '#FF9900', '#FFD600', '#00C537', '#109CF1', '#0047FF', '#9E00FF',
    '#000000', '#FF007A', '#AD5300', '#FFF500', '#2CD9FF', '#5438FF',
    '#DB00FF', '#8F8F8F', '#FF8A8A', '#FFCE84', '#FFF09F', '#99FCC1', '#9FDBFF',
    '#98B5FF', '#E0AEFF', '#E2E1E1'];

  constructor(private employeesTableService: EmployeesTableService,
              private userService: UserService) {
    this.employeesTableService.search(this.searchTerm$)
      .subscribe((employees: any) => {
         this.employees = employees;
      });
  }

  ngOnInit() {
    if (this.flag === 'pending') {
      this.displayedColumns = ['photo', 'name', 'email', 'role_select'];
    } else {
      this.displayedColumns = ['photo', 'name', 'role', 'planned_actual', 'pending_approval'];
    }
    this.employeesTableService.getAll().subscribe(
      employees => {
        this.employees = employees;
      }
    );

  }

  checkValue(max: number, value: number): string {
    if (value / max * 100 < 60) {
      return 'red';
    } else if (value / max * 100 < 85) {
      return 'orange';
    } else {
      return 'green';
    }
  }
  filter(value) {
    this.flag = value;
    if (this.flag === 'pending') {
      this.displayedColumns = ['photo', 'name', 'email', 'role_select'];
    } else {
      this.displayedColumns = ['photo', 'name', 'role', 'planned_actual', 'pending_approval'];
    }
    this.employeesTableService.filter(value)
      .subscribe((employees: any) => {
        this.employees = employees;

      });
  }
  inviteEmployee() {
    this.userService.userCompany$.subscribe((name) => {
      this.companyName = name;
    });
    const user = {
      id: 0,
      company: this.companyName,
      email: (document.getElementById('email') as HTMLInputElement).value,
      role: this.roleOption,
      theme: `Invite to "${this.companyName}"`,
    };
    const i = Math.floor(Math.random() * this.colors.length);
    const nameEmployee = 'Employee';
    const photo = this.colors[i];
    const status = 'pending';
    const arr: any = [];
    this.employeesTableService.sendEmail(user).subscribe(() => console.log('Send'));
    const newUser = new User(0, photo, nameEmployee, user.role, user.email, 0, 0, status, arr);
    this.employeesTableService.addUser(newUser).subscribe(() => console.log('Add'));
  }
  changeRole(element) {
    this.employeesTableService.updateUser(element);
  }
}
