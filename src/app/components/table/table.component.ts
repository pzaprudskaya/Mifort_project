import {Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef} from '@angular/core';
import { TableService } from './table.service';
import { headersToString } from 'selenium-webdriver/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  @Input() tableData: Array<string>;
  @Input() lable: string;
  @Output() onAdd= new EventEmitter();

  constructor(private tableService: TableService,
    private changeDetector: ChangeDetectorRef) {}
    rowSelectAdd: boolean;
    headers;
    rows;
    tfootCells;
    color;
    projects;
    arrayOfElements;
    total: number;
    option1: string;

  getTotal(): number{
    let total: number = 0;
    this.arrayOfElements.forEach(element => {
      total += element.value;
    });
    return this.total = total;
  }
  remove(tbodyRow): void{
    const index = this.rows.indexOf(tbodyRow);
    this.rows.splice(index, 1);
    this.color.splice(index, 1);
  }
  add(option): void{
    for(let i = 0; i < this.projects.length; i++){
      if(this.projects[i].name === option){
        this.rows.push(this.projects[i]);
      }
    }
  }
  customFunction(){
    const newProject = this.projects.find((project) => {
      return project.name === this.option1});

    if (newProject) {
      this.rows.push([newProject.name, '', '']);
      this.option1 = 'chooseProject';
    }
  }
  ngOnInit() {
    this.rowSelectAdd = this.tableService.chooseProject;
    this.headers = this.tableService.getHeaderOfTable();
    this.rows = this.tableService.getRowsOfTable();
    this.tfootCells = this.tableService.getTotalOfTable();
    this.color = this.tableService.getColor();
    this.projects = this.tableService.getProject();
    this.arrayOfElements = this.tableService.tableBody;
    this.total = this.getTotal();
    this.option1 = 'chooseProject';
  }
}
