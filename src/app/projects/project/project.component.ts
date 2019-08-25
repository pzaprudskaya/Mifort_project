import { Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Project} from './project-items.model';
import {ProjectNameService} from '../project-name/project-name.service';
import {ProjectNameModel} from '../project-name/project-name.model';
import {ProjectsService} from './projects.service';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {

  displayedColumns: string[] = ['color', 'name', 'team', 'startDate', 'progress', 'endDate', 'play_pause', 'stop' ];
  projects: Project[];
  projectPage: ProjectNameModel;
  totalState: boolean;
  searchTerm$ = new Subject<string>();

  constructor( private projectsService: ProjectsService,
               private projectNameService: ProjectNameService) {
    this.projectsService.search(this.searchTerm$)
      .subscribe((projects: any) => {
      this.projects = projects;
      });
  }

  ngOnInit(): void {
    this.totalState = false;
    this.projectsService.getAll().subscribe(
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

  filterByStatus(status: string): void {
    this.projectsService.filter(status).subscribe(
      (projects: any) => {
        console.log(projects);
        this.projects = projects;
      });
  }

  changeStatus(project: Project, status: string): void {
    project.status = status;
    this.projectsService.update(project);
    this.projectNameService.getProject(project.name).subscribe(
      projectPage => {
      this.projectPage = projectPage[0];
    });
    this.projectPage.status = status;
    this.projectNameService.update(this.projectPage);
  }

}
