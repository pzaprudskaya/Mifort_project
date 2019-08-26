import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectNameService} from './project-name.service';
import {ProjectNameModel} from './project-name.model';
import {ProjectModel} from '../project/project-items.model';
import {ProjectsService} from '../project/projects.service';

@Component({
  selector: 'app-project-name',
  templateUrl: './project-name.component.html',
  styleUrls: ['./project-name.component.sass']
})
export class ProjectNameComponent implements OnInit {
  projectName: string;
  project: ProjectNameModel;
  stateCreate: boolean;
  state: boolean;
  total: number;

  constructor(private route: ActivatedRoute, private projectNameService: ProjectNameService,
              private projectTableService: ProjectsService) {}
  ngOnInit() {
    this.state = false;
    this.projectName = '';
    this.projectName = this.route.snapshot.params.project_name;
    if (this.projectName === 'create') {
      this.projectNameService.getProject('Name').subscribe(
        project => {
          this.project = project[0];
          this.total = 0;
        });
      this.stateCreate = true;
    } else {
      this.projectNameService.getProject(this.projectName).subscribe(
        project => {
          this.project = project[0];
          this.total = this.project.team.map(t => t.workload).reduce((acc, value) => acc + value, 0);
        });
      this.stateCreate = false;
    }
  }
  changeStatus(status) {
    this.project.status = status;
    this.projectNameService.update(this.project);
  }
  save() {
    debugger;
    const myProject = new ProjectModel(this.project.color, this.project.name, this.project.team, this.project.startDate,
      this.project.endDateOrMen, this.project.progressBar.expected, this.project.progressBar.currentlySpent,
      this.project.status);
    if (this.projectName === 'create') {
      this.projectNameService.addNewProject(this.project);
      this.projectTableService.addNewProject(myProject);
    } else {
      this.projectNameService.update(this.project);
      this.projectTableService.update(myProject);
    }
  }
  changeStateArrow() {
    this.state = !this.state;
  }
  changeTotal(value) {
    this.total = value;
  }
}
