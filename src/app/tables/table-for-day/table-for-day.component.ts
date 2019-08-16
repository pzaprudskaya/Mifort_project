import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-table-for-day',
  templateUrl: './table-for-day.component.html',
  styleUrls: ['./table-for-day.component.sass']
})
export class TableForDayComponent implements OnInit {
  headers = ['', 'Project', 'Time', 'Comment'];
  projects = ['Skype', 'Uber', 'Office'];
  @Input() data: any;
  dataSource;
  @Input() editTable: boolean;
  option1;
  displayedColumns;

  constructor() {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Log>(this.data);
    this.option1 = 'chooseProject';
    this.displayedColumns = ['color', 'project', 'time', 'comment', 'delete', ];
  }

  customFunction() {
    this.data.push({id: this.data.length + 1, color: 'gray', projectName: this.option1, time: 0, comment: ' '});
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

  getTotalCost() {
    return this.data.map(t => t.time).reduce((acc, value) => acc + value, 0);
  }

}

export interface Log {
  id: number;
  color: string;
  projectName: string;
  time: number;
  comment: string;
}
