import {Component, Input, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.sass']
})
export class ProgressComponent implements OnInit {

  @Input() projectName: string = '';
  selected = 'option2';
  condition: boolean = false;

  activeColor: string = '#99FCC1';

  colors: string[] = ['#FF0000', '#FF9900', '#FFD600', '#00C537', '#109CF1', '#0047FF', '#9E00FF',
  '#000000', '#FF007A', '#AD5300', '#FFF500', 'rgba(0, 224, 22, 0.6)', '#2CD9FF', '#5438FF',
  '#DB00FF', '#8F8F8F', '#FF8A8A', '#FFCE84', '#FFF09F', '#99FCC1', '#9FDBFF',
   '#98B5FF', '#E0AEFF', '#E2E1E1', ];
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  constructor() {}
  ngOnInit() {
  }
  changeCondition(){
    this.condition === true ? this.condition = false : this.condition = true;
  }
  changeColor(item){
    this.activeColor = item;
  }
}
