import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-approval-period',
  templateUrl: './approval-period.component.html',
  styleUrls: ['./approval-period.component.sass']
})
export class ApprovalPeriodComponent implements OnInit {
  periods: string[];
  statuses: string[];
  @Input() approval: string;
  @Input() notify: any[];
  @Input() abilityToForget: boolean;
  @Input() submitTimeLogs: boolean;
  flag: boolean;
  ngOnInit() {
    this.periods = ['1 week', '2 week', 'month', 'I don\'t need to approvals'];
    this.statuses = ['error', 'warn'];
    this.flag = false;
  }
  changePeriod() {
    debugger;
    if (this.approval === 'I don\'t need to approvals') {
      this.flag = true;
      this.abilityToForget = false;
      this.submitTimeLogs = false;
      this.notify = [[false, 10, 'error'], [false, 15, 'warn']];
    } else {  this.flag = false; }
  }


}
