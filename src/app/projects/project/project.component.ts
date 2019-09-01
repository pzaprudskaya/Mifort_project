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
  projectPages;
  totalState: boolean;
  searchTerm$ = new Subject<string>();
  projectsQuantity: number;
  projectsNext: Project[] = [];
  loadMoreState: boolean = true;

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
        this.projectsQuantity = projects.length;
        this.projectsNext = projects.slice(20, projects.length);
        this.projects = projects.splice(0, 20);
        if(this.projectsQuantity < 20) {
          this.loadMoreState = false;
        }
      }
    );
    this.projectNameService.getProjects().subscribe(
      (projectPages) => {
        this.projectPages = projectPages;
      });
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
        this.projects = projects;
      });
  }

  changeStatus(project: Project, status: string): void {
    project.status = status;
    this.projectsService.update(project).subscribe(() => console.log('Update!'));
    debugger;
    this.projectPage = this.projectPages.find((item) => item.name === project.name);

    this.projectPage.status = status;
    this.projectNameService.update(this.projectPage).subscribe(() => console.log('Update!'));
  }
  loadMore() {
    this.projects = this.projects.concat(this.projectsNext.splice(0, 5));
    this.projects.length === this.projectsQuantity ? this.loadMoreState = false : this.loadMoreState = true;
  }
}
