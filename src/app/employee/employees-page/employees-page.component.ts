import {Component, Input, OnInit} from '@angular/core';
import { EmployeesTableService } from './employees-table.service';
import {Employees} from './items.model';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.sass']
})
export class  EmployeesPageComponent implements OnInit {
  roles = ['Project Manager', 'Employee', 'HR Manager', 'Owner', 'Admin'];
  roleOption = ['Project Manager'];
  @Input() employeeName: string;

  employees: Employees[];
  searchTerm$ = new Subject<string>();
  displayedColumns: string[];


  constructor(private employeesTableService: EmployeesTableService) {
    this.employeesTableService.search(this.searchTerm$)
      .subscribe((employees: any) => {
         this.employees = employees;

      });
  }

  ngOnInit() {
    this.displayedColumns = ['photo', 'name', 'role', 'planned_actual', 'pending_approval'];
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
    this.employeesTableService.filter(value)
      .subscribe((employees: any) => {
        this.employees = employees;

      });
  }

}
