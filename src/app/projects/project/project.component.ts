import { Component, OnInit, ViewChild } from '@angular/core';
import {  MatTableDataSource} from "@angular/material";





export interface Projects {
  color: string;

  name: string;
  team: Employees[];
  startDate: string;

  endDate: string;
  status: string;

}
export interface Employees {
  id: number;
  photo: string;
  name: string;
  workload: string;
  condition: boolean;

}


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {
  team: Employees[] = [
    {id: 0, photo: '#0047FF', name: 'Anna', workload: '22', condition: false},
    {id: 1, photo: '#9E00FF', name: 'Misha', workload: '55', condition: false},
    {id: 2, photo: '#00C537', name: 'Daria', workload: '19', condition: false},

  ];

  ELEMENT_DATA: Projects[] = [
    {color: '#FF007A', name: 'Skype', team: this.team, startDate:'1 Jan, 2018',  endDate:'19 Sep, 2020', status: 'active' },
    {color: '#FFF500', name: 'Windows', team: [], startDate:'11 Aug, 2018',  endDate:'21 Mar, 2019', status: 'active' },
    {color: '#AD5300', name: 'Word', team: [], startDate:'4 Feb, 2018',  endDate:'8 Aug, 2021', status: 'archived' },

  ];

  condition: boolean = false;
  displayedColumns: string[] = ['color', 'name', 'team', 'startDate', 'progress', 'endDate' ];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor() {

  }

  totalState: boolean;
  ngOnInit() {

    this.totalState = false;
  }
  changeCondition(item){
    this.team.forEach((team) => {
      if (team.id === item.id) {
        item.condition = !item.condition;
      }
    })
  }

  delete(item){
    this.team.forEach((team, i) => {
      if (team.id === item.id) {
        this.team.splice(i, 1)
      }
    })
  }
}
