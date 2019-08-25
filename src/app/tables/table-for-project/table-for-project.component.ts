import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-for-project',
  templateUrl: './table-for-project.component.html',
  styleUrls: ['./table-for-project.component.sass']
})
export class TableForProjectComponent implements OnInit {
  @Input() editTable: boolean;
  @Input() data: any;
  roles = ['Choose role', 'Project Manager', 'Employee', 'HR Manager', 'Owner', 'Admin'];
  projects = ['Skype', 'Uber', 'Office'];
  constructor() { }

  ngOnInit() {
  }

}
