import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-for-day',
  templateUrl: './table-for-day.component.html',
  styleUrls: ['./table-for-day.component.sass']
})
export class TableForDayComponent implements OnInit {
  headers = ['', 'Project', 'Time', 'Comment'];
  projects = ['Skype', 'Uber', 'Office'];
  @Input() data: any;
  @Input() editTable: boolean;
  option1;

  constructor() {
  }

  ngOnInit() {
    this.option1 = 'chooseProject';

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

