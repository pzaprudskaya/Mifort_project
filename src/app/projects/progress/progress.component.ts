import {Component, Input, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProgressService } from './progress.service';
import {Project} from '../project/items.model';
@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.sass']
})
export class ProgressComponent implements OnInit {
  @Input() name: string;
  @Input() color: string = '#FF0000';
  @Input() code: string;
  @Input() status: string;
  @Input() projectType: string;
  @Input() startDate: string;
  @Input() endDate: string;
  @Input() progressBar: any;
  @Input() projectName = '';
  condition = false;

  colors: string[] = ['#FF0000', '#FF9900', '#FFD600', '#00C537', '#109CF1', '#0047FF', '#9E00FF',
  '#000000', '#FF007A', '#AD5300', '#FFF500', 'rgba(0, 224, 22, 0.6)', '#2CD9FF', '#5438FF',
  '#DB00FF', '#8F8F8F', '#FF8A8A', '#FFCE84', '#FFF09F', '#99FCC1', '#9FDBFF',
   '#98B5FF', '#E0AEFF', '#E2E1E1', ];
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  constructor(private progressService: ProgressService) {}
  ngOnInit() {
  }
  changeCondition() {
    this.condition === true ? this.condition = false : this.condition = true;
  }
  changeColor(item) {
    this.color = item;
    this.condition = false;
  }
  sendToServer(name){
    console.log(name);

    let body: Project = { 
      color: this.color,
      name: this.name,
      team:
        [
          {
            photo:	this.endDate,
            name:	this.endDate,
            workload:	3 ,
          }
        ],
      startDate:	this.startDate,
      endDate:	this.endDate,
      planned:	12,
      actual:	22,
      status: this.status,
    }
    this.progressService.update(body).subscribe( log => console.log(log));
    this.progressService.getAll().subscribe(log => console.log(log));
  }
}