import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approval-period',
  templateUrl: './approval-period.component.html',
  styleUrls: ['./approval-period.component.sass']
})
export class ApprovalPeriodComponent implements OnInit {

  flag: boolean = false;

  ngOnInit() {
  }
  stateFalse(){
    this.flag = true;
  }
  stateTrue(){
    this.flag = false;
  }
}
