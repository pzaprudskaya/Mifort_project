import { Component, OnInit } from '@angular/core';
import {TimelogsService} from './timelogs.service';
import {Timelog} from './timelog.model';

@Component({
  selector: 'app-timelog',
  templateUrl: './timelog.component.html',
  styleUrls: ['./timelog.component.sass']
})
export class TimelogComponent implements OnInit {
  logs: any[]=[
  {"color": "blue","comment": "комментарий....","time":[1,2.5,1,4,2,0.5,0,0], "projectName": "Skype"},
  {"color": "purple","comment": "комментарий....","time":[1,1,4.5, 2.5,1,2,0,0], "projectName": "Uber"},
  {"color":"green","comment":"комментарий....","time":[1,2,1.5,0.5,3,0,0,0],"projectName":"Windows"}];
  timelogs: Timelog[];

  constructor(private timelogsService: TimelogsService) { }
  ngOnChanges() {
  }
  ngOnInit() {
    /*this.logs = [];
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
    console.log(this.logs)*/
  }

}
