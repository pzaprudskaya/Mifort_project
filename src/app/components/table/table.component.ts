import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {TableService} from './table.service';
import {CompanyModel} from './company.model';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  @Input() data: any[];
  @Input() editTable: boolean;
  total: number[] = Array(8).fill(0);
  headers: string[];
  @Input() timelogs : boolean;
  totalText : string;
  totalHourse: number = 0;
  @Input() profileBD: boolean;
  @Output() updateTimelogs: EventEmitter<any> = new EventEmitter();
  @Output() updateProfileBD : EventEmitter<any> = new EventEmitter();
  constructor(private tableService: TableService) {}

  findTotalByDay() : void {
    this.total = Array(8).fill(0);
    for(let i = 0; i < this.total.length; i++) {
      for(let item = 0; item < this.data.length; item++) {
        for(let j = 0; j < this.data[item].time.length; j++) {
          if(i === j) {
            this.total[i] = this.total[i] + this.data[item].time[j];
          }
        }
      }
    }
  }

  findTotalForProject() : void {
    this.data.forEach(function(item) {
      let arrayTime = item.time;
      arrayTime[arrayTime.length - 1] = 0;
      for(let i = 0; i < arrayTime.length - 1; i++) {
        arrayTime[arrayTime.length - 1] += arrayTime[i];
      }
    })
  }
  findTotalHourse() : void {
    this.totalHourse = 0;
    for(let i = 0; i < this.data.length; i++) {
      this.totalHourse += this.data[i].time;
    }
  }

  determineViewTable() : string {
    if(!this.timelogs) {
      this.headers = ["", " ", " ", " "];
      this.totalText = "Total time on projects";
      return "profile";
    } 
    this.headers = ["","Comment","Mon","Tue","Wed","Thu","Fri","Sat","Sun"]; 
    this.totalText = "Total";
    return "timelogs";
  }

  changeTotal(input : object,day : number) : void {
    for(let i = 0; i < this.data.length; i++) {
      if(input.parentElement.parentElement.getAttribute("id") == i) {
        for(let j = 0; j < this.data[i].time.length; j++) {
          if(j == day) {
            this.data[i].time[j] = Number(input.value);
            this.findTotalForProject();
            this.findTotalByDay();
            this.update();
          }
        }
      });
    });
    console.log('Count: ' + this.count);
    if (!this.timelogs) {
      if (!this.editTable) {
        this.tableHead = [' ', 'Project', 'Role', 'Time'];
      } else {
        this.tableHead = [' ', 'Project', 'Role', 'Time', ' '];
      }
    }
  }

  changeTotalHourse(input : object) {
    for(let i = 0; i < this.data.length; i++) {
      if(input.parentElement.parentElement.getAttribute("id") == i) {
        this.data[i].time = Number(input.value);
        this.findTotalHourse();
        this.updateProfileBD.emit(this.data);
      }
    }
  }  

  removeRecord(value : number) {
   console.log(this.data[value]);
   this.data.slice(value,1);
   this.update();
  }
  update() {
    if(this.profileBD) {
      this.updateProfileBD.emit(this.data);
    } else {
      this.updateTimelogs.emit(this.data);
    }
  }
  ngOnInit() {
    if(this.determineViewTable() === "timelogs") {
      this.findTotalForProject();
      this.findTotalByDay();
    } else {
      this.findTotalHourse();
    }
   
  };
  ngOnChanges() {
  };

}

