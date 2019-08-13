import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-approval-period',
  templateUrl: './approval-period.component.html',
  styleUrls: ['./approval-period.component.sass']
})
export class ApprovalPeriodComponent implements OnInit {
  periods: string[];
  statuses: string[];
  @Input() company;
  @Input() submitTimeLogs: boolean;
  flag: boolean;
  ngOnInit() {
    this.periods = ['1 week', '2 week', 'month', 'I don\'t need to approvals'];
    this.statuses = ['error', 'warn'];
    this.flag = false;
  }
  changePeriod() {
    if (this.company.approval === 'I don\'t need to approvals') {
      this.flag = true;
      this.company.abilityToForget = false;
      this.company.submitTimeLogs = false;
      this.company.notify = [[false, 10, 'error'], [false, 15, 'warn']];
    } else {  this.flag = false; }
  }


}
