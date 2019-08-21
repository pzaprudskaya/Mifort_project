import {Component, Input, OnInit} from '@angular/core';
import {TimelogsByWeekService} from '../../timesheets/by-week/timelogs-by-week.service';
import {EmployeesService} from '../../employee/add-employee/employee.service';
import {ApprovalsService} from '../../approvals/approvals-page/employees-table.service';
import {ApprovalModel} from '../../approvals/approvals-page/items.model';

@Component({
  selector: 'app-approve-reject-forget',
  templateUrl: './approve-reject-forget.component.html',
  styleUrls: ['./approve-reject-forget.component.sass']
})
export class ApproveRejectForgetComponent implements OnInit {
  @Input() employee;
  @Input() period;
  total: number = 0;
  ngOnInit() {
  }
  constructor(private timelogsByWeekService: TimelogsByWeekService, private employeesService: EmployeesService,
              private approvalsService: ApprovalsService) {

  }
  sendStatus(value) {
    debugger;
    const comment = (document.getElementById('comment') as HTMLInputElement).value;
    this.employee.timesheetsPendingApproval.forEach((item) => {
      if (this.period === item.period) {
        item.status = value;
        item.logs.forEach((log) => {
          this.total += log.time.reduce((acc, accTwo) => acc + accTwo, 0);
        });
        item.comment = comment;
      }
    });
    this.timelogsByWeekService.update({name: this.employee.name, data: this.employee.timesheetsPendingApproval})
      .subscribe(() => console.log('Update!'));
    this.employeesService.update(this.employee)
      .subscribe(() => console.log('Update!'));
    const approval = new ApprovalModel(0, this.employee.photoUrl, this.employee.name, this.employee.workload * 7,
     this.total, value, this.period, comment);
    this.approvalsService.add(approval)
      .subscribe(() => console.log('Update!'));


  }
}
