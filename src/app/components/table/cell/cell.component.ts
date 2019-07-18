import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.sass']
})
export class CellComponent implements OnInit {
  @Input() cellData: string;
  @Input() changeProjectList: Array<string>;
  selected: string = this.cellData;
  constructor() { }

  ngOnInit() {
  }

}
