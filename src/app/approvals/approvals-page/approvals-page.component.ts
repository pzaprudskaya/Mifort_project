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
export class  ApprovalsPageComponent implements OnInit {
  @Input() employeeName: string;
  statuses: string[] = ['Approved', 'Rejected', 'Forgot'];
  status: string;
  searchTerm$ = new Subject<string>();
  displayedColumns: string[];
  employees: Approval[];
  flag: string;
  period: string;


  constructor(private approvalsService: ApprovalsService, public dialog: MatDialog) {
    this.approvalsService.search(this.searchTerm$)
      .subscribe((employees: any ) => {
        this.employees = employees;
      });
  }

  ngOnInit(): void {
    if (this.flag === 'Rejected') {
      this.displayedColumns = ['photo', 'name', 'planned_actual', 'hours', 'period', 'comment', 'status'];
    } else {
      this.displayedColumns = ['photo', 'name', 'planned_actual', 'hours', 'period', 'status'];
    }
    this.approvalsService.getAll().subscribe(
      employees => {
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
  filter(value): void {
    this.flag = value;
    if (this.flag === 'Rejected') {
      this.displayedColumns = ['photo', 'name', 'planned_actual', 'hours', 'period', 'comment', 'status'];
    } else {
      this.displayedColumns = ['photo', 'name', 'planned_actual', 'hours', 'period', 'status'];
    }
    this.approvalsService.filter(value)
      .subscribe(
        (employees: any) => {
          this.employees = employees;
        }
      );
  }
    filterByPeriod(event): void {
      this.approvalsService.filterByPeriod(event)
          .subscribe(
            (employees: any) => {
              this.employees = employees;
            }
          );
  }

  changeStatus(approval: Approval): void {
    if (approval.status === 'Rejected') {
      this.changeStatusDialog(approval);
    } else {
      this.approvalsService.update(approval)
        .subscribe(() => console.log('Update!'));
    }
  }
  changeStatusDialog(approval: Approval): void {
    const dialogRef = this.dialog.open(DialogChangeStatusComponent, {data: {comment: ''}});
    dialogRef.afterClosed().subscribe(result => {
      if (result.length !==  0) {
        approval.comment = result;
        this.approvalsService.update(approval)
          .subscribe(() => console.log('Update!'));
      }
    });
  }
}
