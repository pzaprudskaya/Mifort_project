import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Log} from '../table-for-day/table-for-day.component';

@Component({
  selector: 'app-table-for-week',
  templateUrl: './table-for-week.component.html',
  styleUrls: ['./table-for-week.component.sass']
})
export class TableForWeekComponent implements OnInit, OnChanges {
  @Input() editTable: boolean;
  @Input() data: any;
  headers = ['', 'Comment', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  roles = ['Project Manager', 'Employee', 'HR Manager', 'Owner', 'Admin'];
  option1;
  projects = ['Office', 'Skype', 'Uber', 'Windows'];
  displayedColumns;
  dataSource;
  fullTotal: number;
  constructor() {
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<Log>(this.data);
    this.option1 = 'chooseProject';
    this.displayedColumns = ['color', 'project', 'comment', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 'week', 'delete' ];
  }
  ngOnChanges() {
    this.dataSource = new MatTableDataSource<Log>(this.data);
  }
  customFunction() {
    this.data.push({id: this.data.length + 1, color: 'gray', projectName: this.option1, comment: ' ', time: [0, 0, 0, 0, 0, 0, 0]});
    this.option1 = 'chooseProject';
    this.dataSource = new MatTableDataSource<Log>(this.data);
  }

  delete(item) {
    this.data.forEach((log, i) => {
      if (log.id === item.id) {
        this.data.splice(i, 1);
      }
    });
    this.dataSource = new MatTableDataSource<Log>(this.data);
  }
  getTotalByDay(i) {
    return this.data.map(t => t.time[i]).reduce((acc, value) => acc + value, 0);
  }
  totalByWeek(element) {
    return element.time.reduce((acc, value) => acc + value, 0);
  }
  getFullTotal() {
    this.fullTotal = 0;
    this.data.forEach((log) => {
      this.fullTotal += log.time.reduce((acc, value) => acc + value, 0);
    });
    return this.fullTotal;
 }
}


export interface Log {
  id: number;
  color: string;
  projectName: string;
  time: number[];
  comment: string;
}

