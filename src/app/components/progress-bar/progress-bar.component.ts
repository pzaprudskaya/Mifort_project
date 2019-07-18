import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.sass']
})
export class ProgressBarComponent implements OnInit {
  @Input() color: string = 'green';
  realWidth: number = 40;
  height: number = 20;
  expectedWidth: number = 50;
  expectedValue: string = '120h';
  realValue: string = '156h';
  total: string = 2300 + 'h';
  @Input() totalState: boolean = true;
  constructor() { }
  ngOnInit() {
  }

}
