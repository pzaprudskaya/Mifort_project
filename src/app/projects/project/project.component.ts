import { Component, OnInit} from '@angular/core';
import { ProjectsTableService } from './projects-table.service';
import {Subject} from 'rxjs';
import {Project} from './items.model';
import {ProjectNameService} from '../project-name/project-name.service';
import {ProjectNameModel} from '../project-name/project-name.model';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {

  displayedColumns: string[] = ['color', 'name', 'team', 'startDate', 'progress', 'endDate', 'play_pause', 'stop' ];

  projects: Project[];
  projectPage: ProjectNameModel;
  searchTerm$ = new Subject<string>();

  constructor( private projectsTableService: ProjectsTableService,
               private projectNameService: ProjectNameService) {
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
  filter(value) {
    console.log(value);
    this.projectsTableService.filter(value)
      .subscribe((projects: any) => {
        console.log(projects);
        this.projects = projects;

      });
  }
  changeStatus(project, status) {
    project.status = status;
    this.projectsTableService.update(project)
      .subscribe(() => console.log('Update!'));
    debugger;
    this.projectNameService.getProject(project.name).subscribe(
      projectPage => {
      this.projectPage = projectPage[0];
    });
    this.projectPage.status = status;
    this.projectNameService.update(this.projectPage)
      .subscribe(() => console.log('Update!'));
  }

}
