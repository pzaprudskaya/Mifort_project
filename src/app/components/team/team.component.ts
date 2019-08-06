import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.sass']
})
export class TeamComponent implements OnInit {
  @Input() value: any[];
  constructor() {}
  previousItem;
  changeCircleActivity(item) {
    if(this.previousItem !== item && this.previousItem !== undefined){
      this.previousItem.active = false;
      item.active = !item.active;
      this.previousItem = item; 
    }
    else{
      item.active = !item.active;
      this.previousItem = item;
    }
      
    
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
