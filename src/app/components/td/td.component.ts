import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-td',
  templateUrl: './td.component.html',
  styleUrls: ['./td.component.sass']
})
export class TdComponent implements OnInit {
  @Input() info: any;
  constructor() {}
  ngOnInit() {}
}

