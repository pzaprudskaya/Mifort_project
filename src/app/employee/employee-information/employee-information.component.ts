import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.sass']
})
export class EmployeeInformationComponent implements OnInit {
  @Input() employeeName: string;
  toggleFlag: boolean;
  constructor() { }

  ngOnInit() {
    this.toggleFlag = false;
  }
  open_information() {
    this.toggleFlag = !this.toggleFlag;
  }

}
