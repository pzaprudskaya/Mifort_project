import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-for-team',
  templateUrl: './table-for-team.component.html',
  styleUrls: ['./table-for-team.component.sass']
})
export class TableForTeamComponent implements OnInit {
  @Input() editTable: boolean;
  @Input() data: any;
  roles = ['Choose role', 'Project Manager', 'Employee', 'HR Manager', 'Owner', 'Admin'];
  users = ['Polina Zaprudskaya', 'Egor Drozd'];
  constructor() { }

  ngOnInit() {
  }

}
