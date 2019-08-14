import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-for-week',
  templateUrl: './table-for-week.component.html',
  styleUrls: ['./table-for-week.component.sass']
})
export class TableForWeekComponent implements OnInit {
  @Input() editTable: boolean;
  @Input() data: any;
  headers = ['', 'Comment', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  roles = ['Choose role', 'Project Manager', 'Employee', 'HR Manager', 'Owner', 'Admin'];

  projects = ['Skype', 'Uber', 'Office'];
  constructor() { }

  ngOnInit() {
  }

}
