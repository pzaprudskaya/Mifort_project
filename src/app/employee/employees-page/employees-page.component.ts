import {Component, Input} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { EmployeesTableService } from './employees-table.service';
export interface Employee {
  photo: string;
  name: string;
  role: string;
  planned_actual: string;
  pending_approval: string;
}
@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.sass']
})
export class  EmployeesPageComponent {
  @Input() employee_name: string = '';
  employees = this.employeesTableService.employees;
  nameChange(name) {
    this.employee_name = name;
  }
  condition: boolean = false;
  displayedColumns: string[] = ['photo', 'name', 'role', 'planned_actual', 'pending_approval'];
  dataSource = new MatTableDataSource(this.employees);
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private employeesTableService: EmployeesTableService){}
  ngOnInit(){

  }
  remove(){
    console.log('delete');
    delete this.employees;
  }
}
