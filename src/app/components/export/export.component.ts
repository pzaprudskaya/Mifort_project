import { Component, OnInit } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import { ExportService } from './export.service';
@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.sass']
})
export class ExportComponent implements OnInit {
  constructor(private exportService: ExportService){

  }
  project: any;
  ngOnInit() {
    // this.exportService.getProject('Uber').subscribe(
    //   project => {
    //     this.project = project[0];
    //   });
    
  }
  exportInCsv(){

    // this.project.forEach(element => {

    //   element.yearsWorkload.projectsWorkload.forEach(elem => {
    //     data.push(
    //       {
    //         project: element.name,
    //         month: element.yearsWorkload.month,
    //         name: elem.name, 
    //         workload: elem.workload,
    //       });
    //   });
    //   data.push(element);
    // });
    let data: any = [


    ];
     
    // const options = { 
    //   fieldSeparator: ',',
    //   quoteStrings: '"',
    //   decimalSeparator: '.',
    //   showLabels: true, 
    //   showTitle: true,
    //   title: 'My Awesome CSV',
    //   useTextFile: false,
    //   useBom: true,
    //   useKeysAsHeaders: true,
    // };
     console.log('DAATAAA '+data)
    // const csvExporter = new ExportToCsv(options);
     
    // csvExporter.generateCsv(data);
  }
}
