import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  project: string;
  time: number;
  comment: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {project: 'Windows', time: 2.25, comment: '#435: added localization on landing page'},
  {project: 'Windows', time: 2.25, comment: '#435: added localization on landing page'},
  {project: 'Windows', time: 2.25, comment: '#435: added localization on landing page'},
  {project: 'Windows', time: 2.25, comment: '#435: added localization on landing page'},
];
@Component({
  selector: 'app-timelog',
  templateUrl: './timelog.component.html',
  styleUrls: ['./timelog.component.sass']
})
export class TimelogComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
