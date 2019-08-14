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
  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

}
