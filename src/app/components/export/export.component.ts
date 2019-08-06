import { Component, OnInit, Input } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import { ExportService } from './export.service';
import { ProjectNameModel } from '../../projects/project-name/project-name.model';
// import { EmployeesService } from
@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.sass']
})
export class ExportComponent implements OnInit {
  constructor(private exportService: ExportService){ }
  project: ProjectNameModel;
  @Input() name;
  ngOnInit() {
    this.exportService.getName(this.name);
    this.exportService.getProject().subscribe(
      project => {
        this.project = project[0];
      });
  }
  exportInCsv(){
    let data: any = [];
    this.project.yearsWorkload.forEach(
      element =>{
        element.projectsWorkload.forEach(elem => {
          data.push(
            {
              project: this.project.name,
              month: element.month,
              name: elem.name, 
              workload: elem.workload,
            });
      }
    );
      
    });
    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'My Awesome CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);   
    csvExporter.generateCsv(data);
  }
}
