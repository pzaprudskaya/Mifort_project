import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectNameService} from './project-name.service';
import {ProjectNameModel} from './project-name.model';
import {ProjectsTableService} from '../project/projects-table.service';
import {ProjectModel} from '../project/items.model';

@Component({
  selector: 'app-project-name',
  templateUrl: './project-name.component.html',
  styleUrls: ['./project-name.component.sass']
})
export class ProjectNameComponent implements OnInit {
  projectName: string;
  project: ProjectNameModel;
  stateCreate: boolean;

  constructor(private route: ActivatedRoute, private projectNameService: ProjectNameService,
              private projectTableService: ProjectsTableService) {}
  ngOnInit() {
    this.projectName = '';
    this.projectName = this.route.snapshot.params.project_name;
    if (this.projectName === 'create') {
      this.projectNameService.getProject('Name').subscribe(
        project => {
          this.project = project[0];
        });
      this.stateCreate = true;
    } else {
      this.projectNameService.getProject(this.projectName).subscribe(
        project => {
          this.project = project[0];
        });
      this.stateCreate = false;
    }
  }
  changeStatus(status) {
    this.project.status = status;
    this.projectNameService.update(this.project)
      .subscribe(() => console.log('Update!'));
  }
  save() {
    const myProject = new ProjectModel(this.project.color, this.project.name, this.project.team, this.project.startDate,
      this.project.endDateOrMen, this.project.progressBar.expected, this.project.progressBar.currentlySpent,
      this.project.status);
    if (this.projectName === 'create') {
      this.projectNameService.addNewProject(this.project)
        .subscribe(() => console.log('Add!'));
      this.projectTableService.addNewProject(myProject)
        .subscribe(() => console.log('Add!'));
    } else {
      this.projectNameService.update(this.project)
        .subscribe(() => console.log('Update!'));

      this.projectTableService.update(myProject)
        .subscribe(() => console.log('Add!'));
    }
  }
}
