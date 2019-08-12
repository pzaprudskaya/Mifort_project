import { Component, OnInit, Input } from '@angular/core';
import {TimelogsService} from './timelogs.service';
import {Timelog} from './timelog.model';

@Component({
  selector: 'app-timelog',
  templateUrl: './timelog.component.html',
  styleUrls: ['./timelog.component.sass']
})
export class TimelogComponent implements OnInit {
  @Input() logs: any[] = [];
  @Input() timelogs: Timelog[];
  save: string;

  constructor(private timelogsService: TimelogsService) { }

  ngOnInit() {
    this.timelogsService.getLogs().subscribe(
      timelogs => {
        this.logs = [];
        this.timelogs = timelogs;
        this.timelogs.forEach((log) => {
          this.logs.push(log);
        });
      }
    );
  }
  updateTimelogs() {
    debugger;
    this.timelogsService.update(this.logs)
          .subscribe(() => console.log('Update!'));
  }
}
