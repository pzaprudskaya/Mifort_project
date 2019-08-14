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
  roles = ['Project Manager', 'Employee', 'HR Manager', 'Owner', 'Admin'];
  option1;
  projects = ['red', 'blue', 'purple'];
  constructor() { }

  ngOnInit() {
    this.option1 = 'gray';
  }
  customFunction() {
    this.data.push({id: this.data.length + 1, color: 'gray', projectName: this.option1, time: 0, comment: ' '});
    this.option1 = 'chooseProject';
  }

  delete(item) {
    this.data.forEach((log, i) => {
      debugger;
      if (log.id === item.id) {
        this.data.splice(i, 1);
      }
    });
  }
}
