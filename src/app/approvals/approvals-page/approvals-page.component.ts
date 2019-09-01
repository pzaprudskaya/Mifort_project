import {Component, Input, OnInit} from '@angular/core';
import {ApprovalsService} from './employees-table.service';
import {Approval} from './items.model';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material';
import {DialogChangeStatusComponent} from '../dialog-change-status/dialog-change-status.component';

@Component({
  selector: 'app-approvals-page',
  templateUrl: './approvals-page.component.html',
  styleUrls: ['./approvals-page.component.sass']
})
export class ApprovalsPageComponent implements OnInit {
  @Input() employeeName: string;
  statuses: string[] = ['Approved', 'Rejected', 'Forgot'];
  status: string;
  searchTerm$ = new Subject<string>();
  displayedColumns: string[];
  employees: Approval[];
  isFlag: string;
  period: string;
  rejectedStatus = 'Rejected';
  constructor(private approvalsService: ApprovalsService, public dialog: MatDialog) {
    this.approvalsService.search(this.searchTerm$)
      .subscribe((employees: Approval[]) => {
        this.employees = employees;
      });
  }

  ngOnInit(): void {
    this.displayedColumns = this.changeColumns();
    this.approvalsService.getAll().subscribe(
      (employees: Approval[]) => {
        this.employees = employees;
      }
    );
  }

  checkValue(max: number, value: number): string {
    if (value / max * 100 < 60) {
      return 'red';
    } else if (value / max * 100 < 85) {
      return 'orange';
    } else {
      return 'green';
    }
  }

  filterByStatus(status: string): void {
    this.isFlag = status;
    this.displayedColumns = this.changeColumns();
    this.approvalsService.filterByStatus(status)
      .subscribe((employees: Approval[]) => {
          this.employees = employees;
        }
      );
  }

  filterByPeriod(period: string): void {
    this.approvalsService.filterByPeriod(period)
      .subscribe((employees: Approval[]) => {
          this.employees = employees;
        }
      );
  }

  changeStatus(approval: Approval): void {
    if (approval.status === this.rejectedStatus) {
      this.changeStatusDialog(approval);
    } else {
      this.approvalsService.update(approval).subscribe(() => console.log('Update!'));
    }
  }

  changeStatusDialog(approval: Approval): void {
    const dialogRef = this.dialog.open(DialogChangeStatusComponent, {data: {comment: ''}});
    dialogRef.afterClosed().subscribe(result => {
      if (result.length) {
        approval.comment = result;
        this.approvalsService.update(approval).subscribe(() => console.log('Update!'));
      }
    });
  }

  changeColumns() {
    if (this.isFlag !== this.rejectedStatus) {
      return ['photo', 'name', 'planned_actual', 'hours', 'period', 'status'];
    }
    return ['photo', 'name', 'planned_actual', 'hours', 'period', 'comment', 'status'];
  }
}
