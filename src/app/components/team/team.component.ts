import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.sass']
})
export class TeamComponent implements OnInit {
  @Input() value: any[];
  constructor() {

  }
  changeCircleActivity(item) {
    item.active = !item.active;
  }
  ngOnInit() {
  }

/*
  delete(array, item){
    array.forEach((team, i) => {
      if (team.id === item.id) {
        array.splice(i, 1);
      }
    })
  }
  */
}
