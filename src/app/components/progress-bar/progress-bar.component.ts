import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.sass']
})
export class ProgressBarComponent implements OnInit {
  @Input() progress: any;
  color: string;
  height: number;
  expectedValue: number;
  realValue: number;
  total: number;
  totalState = true;

  constructor() {}
  ngOnInit() {
    this.color = 'green';
    this.height = 20;
    this.total = this.progress.total;
    this.expectedValue = this.progress.expected;
    this.realValue = this.progress.currentlySpent;
  }

}
