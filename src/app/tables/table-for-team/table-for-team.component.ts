import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-table-for-team',
  templateUrl: './table-for-team.component.html',
  styleUrls: ['./table-for-team.component.sass']
})
export class TableForTeamComponent implements OnInit {
  @Output() change: EventEmitter<number> = new EventEmitter<number>();
  @Input() editTable: boolean;
  @Input() data: any;
  roles = ['Project Manager', 'Employee', 'HR Manager', 'Owner', 'Admin'];
  users = ['Polina Zaprudskaya', 'Egor Drozd'];
  usersInCompany = [{name: 'Polina Zaprudskaya', photo: 'https://pp.userapi.com/c849032/v849032975/1b5995/yD94I7fPbLQ.jpg'},
    {name: 'Egor Drozd', photo: 'https://sun9-36.userapi.com/c850616/v850616650/190edd/-5m_QHZ0b0I.jpg'}];
  option1;
  option2;
  photo: string;
  displayedColumns;
  dataSource;
  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Team>(this.data.team);
    this.option1 = 'chooseName';
    this.option2 = 'chooseRole';
    this.displayedColumns = ['name', 'roles', 'time', 'hours', 'delete' ];
  }
  customFunction() {
    this.usersInCompany.forEach((user) => {
      if (user.name === this.option1) {
        this.photo = user.photo;
      }
    });
    this.data.team.push({id: this.data.team.length + 1, photo: this.photo, name: this.option1, role: this.option2, workload: 0});
    this.option1 = 'chooseProject';
    this.option2 = 'chooseRole';
    this.dataSource = new MatTableDataSource<Team>(this.data.team);
  }

  delete(item) {
    this.data.team.forEach((user, i) => {
      if (user.id === item.id) {
        this.data.team.splice(i, 1);
      }
    });
    this.dataSource = new MatTableDataSource<Team>(this.data.team);
  }
  getTotal() {
    this.change.emit(this.data.team.map(t => t.workload).reduce((acc, value) => acc + value, 0));
    return this.data.team.map(t => t.workload).reduce((acc, value) => acc + value, 0);
  }

}


export interface Team {
  id: number;
  photo: string;
  name: string;
  role: string;
  workload: number;
}
