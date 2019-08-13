import {Component, Input, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.sass']
})
export class ProgressComponent implements OnInit {
  @Input() project;
  condition = false;
  month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  typeProject = ['Fixed resources', 'Time & Material']
  colors: string[] = ['#FF0000', '#FF9900', '#FFD600', '#00C537', '#109CF1', '#0047FF', '#9E00FF',
  '#000000', '#FF007A', '#AD5300', '#FFF500', 'rgba(0, 224, 22, 0.6)', '#2CD9FF', '#5438FF',
  '#DB00FF', '#8F8F8F', '#FF8A8A', '#FFCE84', '#FFF09F', '#99FCC1', '#9FDBFF',
   '#98B5FF', '#E0AEFF', '#E2E1E1', ];
  flag: boolean;
  constructor() {}
  ngOnInit() {
  }
  changeCondition() {
    this.condition === true ? this.condition = false : this.condition = true;
  }
  changeColor(item) {
    this.project.color = item;
    this.condition = false;
  }

  inputStartDate(event) {
    const start = new Date(event.value);
    this.project.startDate = start.getDate() + ', ' + this.month[start.getMonth()] + ' ' + start.getFullYear();
  }

  inputEndDate(event) {
    const end = new Date(event.value);
    this.project.endDateOrMen = end.getDate() + ', ' + this.month[end.getMonth()] + ' ' + end.getFullYear();
  }
  changeType() {
    this.project.endDateOrMen = '';
  }
}
