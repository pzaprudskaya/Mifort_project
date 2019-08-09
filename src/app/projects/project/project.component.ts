import { Component, OnInit} from '@angular/core';
import {  MatTableDataSource} from '@angular/material';
import { ProjectsTableService } from './projects-table.service';
import { Subject } from 'rxjs';
import { Project } from './items.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {

  displayedColumns: string[] = ['color', 'name', 'team', 'startDate', 'progress', 'endDate', 'play_pause', 'stop' ];


  projects: Project[];
  searchTerm$ = new Subject<string>();

  dataSource = new MatTableDataSource(this.projects);

  constructor( private projectsTableService: ProjectsTableService) {
    this.projectsTableService.search(this.searchTerm$)
      .subscribe((projects: any) => {
      this.projects = projects;

      });

  }

  totalState: boolean;
  ngOnInit() {

    this.totalState = false;

    this.projectsTableService.getAll().subscribe(
      projects => {
        this.projects = projects;
      }
    );
  }

  checkValue(max: number, value: number): string {
    if (value / max * 100 < 60) {
      return 'red';
    } else if (value / max * 100 < 85) {
      return 'orange';
    } else {
      return 'green';
    }
  }
  archiveProject(project) {

    project.status = 'archived';
    this.projectsTableService.update(project)
      .subscribe(() => console.log('Update!'));

  }
  filter(value) {
    console.log(value);
    this.projectsTableService.filter(value)
      .subscribe((projects: any) => {
        console.log(projects);
        this.projects = projects;

      });
  }

}
