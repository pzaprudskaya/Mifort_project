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

  constructor(private route: ActivatedRoute, private projectNameService: ProjectNameService) {}
  ngOnInit() {
    this.projectName = '';
    this.projectName = this.route.snapshot.params.project_name;
    this.projectNameService.getName(this.projectName);
    this.projectNameService.getProject().subscribe(
      project => {

        this.project = project[0];
      });
  }
}
