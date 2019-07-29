import { Component, OnInit } from '@angular/core';
import {TimelogsService} from './timelogs.service';
import {Timelog} from './timelog.model';

@Component({
  selector: 'app-timelog',
  templateUrl: './timelog.component.html',
  styleUrls: ['./timelog.component.sass']
})
export class TimelogComponent implements OnInit {
  logs: any[];
  timelogs: Timelog[];

  constructor(private timelogsService: TimelogsService) { }

  ngOnInit() {
    this.logs = [];
    this.timelogs = [];
    this.timelogsService.getLogs().subscribe(
      timelogs => {
        this.timelogs = timelogs;
        this.timelogs.forEach((log) => {
          this.logs.push(Object.keys(log).map((key) => {
            return log[key];
          }));
        });
      }
    );
  }

}
