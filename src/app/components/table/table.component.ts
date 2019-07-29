import {Component, Input, OnInit} from '@angular/core';
import {TableService} from './table.service';
import {CompanyModel} from './company.model';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  @Input() editTable: boolean;
  @Input() headShow: boolean;
  @Input() timelogs: boolean;
  @Input() data: any[];
  tableData: any[];
  tableHead: string[];
  totalValue: number;
  count: number;
  company: CompanyModel;
  projects: object[];
  roles: string[];
  option1: string;
  option2: string;

  constructor(private tableService: TableService) {
  }

  ngOnInit() {
    this.tableData = [];
    this.totalValue = 0;
    this.tableHead = [];
    this.projects = [];
    this.option1 = 'chooseProject';
    this.option1 = 'chooseRole';

    this.tableService.getCompany().subscribe(
      company => {
        this.roles = company[0].roles;
        company[0].projects.forEach((project) => {
          this.projects.push(Object.keys(project).map((key) => {
            return project[key];
          }));
        });
      }
    );


    this.data.forEach((arr) => {
      this.count = 0;
      arr.forEach((property) => {
        this.count++;
        if (typeof property === 'number') {
          this.calculate(property);
        }
      });
    });
    if (!this.timelogs) {
      if (!this.editTable) {
        this.tableHead = [' ', 'Project', 'Role', 'Time'];
      } else {
        this.tableHead = [' ', 'Project', 'Role', 'Time', ' '];
      }
    } else {
      if (!this.editTable) {
        if (this.count === 4) {
          this.tableHead = [' ', 'Project', 'Time(hours)', 'Comment'];
        } else if (this.count === 9) {
          this.tableHead = [' ', 'Comment', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        } else {
          return;
        }
      } else {
        if (this.count === 4) {
          this.tableHead = [' ', 'Project', 'Time(hours)', 'Comment', ' '];
        } else if (this.count === 9) {
          this.tableHead = [' ', 'Comment', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', ' '];
        } else {
          return;
        }

      }

    }
  }

  calculate(value: number) {
    this.totalValue += value;
  }


}
