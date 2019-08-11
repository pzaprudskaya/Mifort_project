import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectNameService} from './project-name.service';
import {ProjectNameModel} from './project-name.model';

@Component({
  selector: 'app-project-name',
  templateUrl: './project-name.component.html',
  styleUrls: ['./project-name.component.sass']
})
export class ProjectNameComponent implements OnInit {
  projectName: string;
  project: ProjectNameModel;
  stateCreate: boolean;

  constructor(private route: ActivatedRoute, private projectNameService: ProjectNameService) {}
  ngOnInit() {
    this.projectName = '';
    this.projectName = this.route.snapshot.params.project_name;
    if (this.projectName === 'create') {
      this.projectNameService.getName('Name');
      this.stateCreate = true;
    } else {
      this.projectNameService.getName(this.projectName);
      this.stateCreate = false;
    }
    this.projectNameService.getProject().subscribe(
      project => {

        this.project = project[0];
      });
  }
  changeStatus(status) {
    this.project.status = status;
    this.projectNameService.update(this.project)
      .subscribe(() => console.log('Update!'));

  }
  save() {
    debugger;
    if (this.projectName === 'create') {
      this.projectNameService.addNewProject(this.project)
        .subscribe(() => console.log('Add!'));
    } else {
      this.projectNameService.update(this.project)
        .subscribe(() => console.log('Update!'));
    }
  }
}
