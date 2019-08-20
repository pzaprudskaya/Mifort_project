import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {TableService} from './table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  roles = ['Choose role', 'Project Manager', 'Employee', 'HR Manager', 'Owner', 'Admin'];
  projects = ['Skype', 'Uber', 'Office'];
  chooseRole = 'Choose role';
  @Input() data: any[];
  @Input() editTable: boolean;
  total: number[] = Array(8).fill(0);
  headers: string[];
  @Input() timelogs: boolean;
  @Input() workload: number;
  totalText: string;
  totalHourse = 0;
  flag : boolean = false;
  @Input() profileBD: boolean;
  @Output() updateTimelogs: EventEmitter<any> = new EventEmitter();
  @Output() updateProfileBD: EventEmitter<any> = new EventEmitter();

  constructor(private tableService: TableService) {
  }

  findTotalByDay(): void {
    this.total = Array(8).fill(0);
    for (let i = 0; i < this.total.length; i++) {
      for (let item = 0; item < this.data.length; item++) {
        for (let j = 0; j < this.data[item].time.length; j++) {
          if (i === j) {
            this.total[i] = this.total[i] + this.data[item].time[j];
          }
        }
      }
    }
  }

  findTotalForProject(): void {
    this.data.forEach(item => {
      const arrayTime = item.time;
      arrayTime[arrayTime.length - 1] = 0;
      for (let i = 0; i < arrayTime.length - 1; i++) {
        arrayTime[arrayTime.length - 1] += arrayTime[i];
      }
    });
  }

  findTotalHourse(): void {
    this.totalHourse = 0;
    for (let i = 0; i < this.data.length; i++) {
      this.totalHourse += this.data[i].time;
    }
    console.log(this.totalHourse)
    if(this.totalHourse > 40) {
      this.flag = true;
    } else {
      this.flag = false;
    }
  }

  determineViewTable(): string {
    if (!this.timelogs) {
      this.headers = ['', ' ', ' ', ' '];
      this.totalText = 'Total time on projects';
      return 'profile';
    }
    this.headers = ['', 'Comment', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.totalText = 'Total';
    return 'timelogs';
  }

  changeTotalHourse(input,id) {
    for (let i = 0; i < this.data.length; i++) {
      if (input.parentElement.parentElement.getAttribute('id') == i) {
        this.data[i].time = Number(input.value);
        this.findTotalHourse();
        this.updateProfileBD.emit(this.data);
      }
    }
  }

  removeRecord(value: number) {
    console.log(this.data[value]);
    this.data.slice(value, 1);
    this.update();
  }

  update() {
    if (this.profileBD) {
      this.updateProfileBD.emit(this.data);
    } else {
      this.updateTimelogs.emit(this.data);
    }
  }

  ngOnInit() {
    console.log(this.workload)
    if (this.determineViewTable() === 'timelogs') {
      this.findTotalForProject();
      this.findTotalByDay();
    } else {
      this.findTotalHourse();
    }
  }
}
