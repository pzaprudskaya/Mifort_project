import {Component, Input, OnInit} from '@angular/core';
import {TimelogsService} from './timelogs.service';
import {Timelog} from './timelog.model';
import {TimeSheetForApproval} from "../../profile-page/profile/profile.model";

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
      this.timelogsService.getLogs().subscribe(
        timelogs => {
          timelogs.forEach((log) => {
          this.logs.push(Object.keys(log).map((key) => {
            return log[key];
          }));
        });
      }
    );
      console.log('Logs: ' + this.logs);
  }
    add() {
      const color = (document.getElementById('color') as HTMLInputElement).value;
      const projectName = (document.getElementById('projectName') as HTMLInputElement).value;
      const time = (document.getElementById('time') as HTMLInputElement).value;
      const comment = (document.getElementById('comment') as HTMLInputElement).value;
      const body = new Timelog(color, projectName, Number(time), comment);
      this.timelogsService.addLog(body).subscribe( log => console.log(log));
    }
    delete(log) {
      this.timelogsService.deleteLog(log).subscribe( deleteLog => console.log(deleteLog));
    }
}
