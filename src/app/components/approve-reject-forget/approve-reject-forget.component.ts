import {Component, Input, OnInit} from '@angular/core';
import {TimelogsByWeekService} from '../../timesheets/by-week/timelogs-by-week.service';
import {EmployeesService} from '../../employee/employee.service';
import {ApprovalsService} from '../../approvals/approvals-page/employees-table.service';
import {Approval, ApprovalModel} from '../../approvals/approvals-page/items.model';
import {EmployeesTableService} from '../../employee/employees-page/employees-table.service';
import {Employees} from '../../employee/employees-page/items.model';

@Component({
  selector: 'app-approve-reject-forget',
  templateUrl: './approve-reject-forget.component.html',
  styleUrls: ['./approve-reject-forget.component.sass']
})
export class ApproveRejectForgetComponent implements OnInit {
  @Input() employee;
  @Input() period;
  user: Employees;
  approvals: Approval[];
  total = 0;
  constructor(private timelogsByWeekService: TimelogsByWeekService,
              private employeesService: EmployeesService,
              private approvalsService: ApprovalsService,
              private employeesTableService: EmployeesTableService) {

  }
  ngOnInit() {
    this.employeesTableService.getUser(this.employee.name).subscribe((user) => {
      this.user = user[0];
    });
    this.approvalsService.getAll().subscribe((approvals) => {
      this.approvals = approvals;
    });
  }

  sendStatus(value) {
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
    const approval = new ApprovalModel(0, this.employee.photoUrl, this.employee.name, this.employee.workload,
     this.total, value, this.period, comment);

    this.approvalsService.update(approval).subscribe(() => console.log('Update!'));

    debugger;
    this.user.pendingApprovalTimesheets.forEach((item, i) => {
      if (item.period === this.period) {
        this.user.pendingApprovalTimesheets.splice(i, 1);
      }
    });
    this.employeesTableService.updateUser(this.user).subscribe(() => console.log('Update!'));
  }

}
