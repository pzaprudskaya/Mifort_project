import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor() { }
  chooseProject: boolean = true;
  tableBody = [
      {
        color: 'red',
        name: "Windows",
        value: 2.25,
        comment: '435: added localization on landing page',
      },
      {
        color: 'green',
        name: "Skype",
        value: 0.25,
        comment: 'Standup meeting',

},
{
  color: 'yellow',
    name: "Skype",
  value: 0.25,
  comment: 'Standup meeting',
},
{
  color: 'gray',
    name: "Skype",
  value: 0.25,
  comment: 'Standup meeting',

}
  ]
  projects = [
    {
      color: 'red',
      name: 'Mifort',
    },
    {
      color: 'blue',
      name: 'Google',

    },
  ]
  tableHeader: Array<string> = [
    'Projects', 'Time (hours)', 'Comment'
  ];
  total = [
    'Total', this.getTotal()
  ];
  getTotal(){
    let total = 0;
    this.tableBody.forEach(element => {
      total += element.value;
    });
    return total;
  }
  getHeaderOfTable(){
    return this.tableHeader;
  }
  getRowsOfTable(){
    return this.tableBody.map(element => {
     return[element.name, element.value, element.comment];
    });
  }
  getTotalOfTable(){
    return this.total;
  }
  getChooseProjectOfTable(){
    return this.chooseProject;
  }
  getProject(){
    return this.projects;
  }
  getColor(){
    let arrOfColors = [];
    this.tableBody.forEach(element => {
      arrOfColors.push(element.color);
    });
    return arrOfColors;
  }
}
