import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-project-name',
  templateUrl: './project-name.component.html',
  styleUrls: ['./project-name.component.sass']
})
export class ProjectNameComponent implements OnInit {
  project_name: string = ''

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.project_name = this.route.snapshot.params['project_name'];
  }

}
