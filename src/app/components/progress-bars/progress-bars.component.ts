import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-progress-bars',
  templateUrl: './progress-bars.component.html',
  styleUrls: ['./progress-bars.component.sass']
})
export class ProgressBarsComponent implements OnInit {

  @Input() color: string;
  @Input() actual: number;
  @Input() planned: number;

  constructor() { }
  ngOnInit() {
  }

}
