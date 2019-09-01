import {Component, Input, OnInit} from '@angular/core';
import {ProjectsService} from '../../projects/project//projects.service';
import {ProjectNameService} from '../../projects/project-name/project-name.service';
import {UserService} from '../../core/logo-user-company/user.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.sass']
})
export class TeamComponent implements OnInit {
  @Input() project;
  projectName;

  constructor(private projectsService: ProjectsService,
              private projectNameService: ProjectNameService,
              private userService: UserService) {
  }

  ngOnInit() {
  }

  changeCircleActivity(item) {
    item.active = !item.active;
  }

  delete(item) {
    debugger;
    this.project.team.forEach((employee, i) => {
      if (employee.id === item.id) {
        this.project.team.splice(i, 1);
      }
    });
    this.projectsService.update(this.project).subscribe(() => console.log('Update'));
    this.projectNameService.getProject(this.project.name).subscribe((projectName) => {
      this.projectName = projectName;
    });
    this.projectName.team = this.project.team;
    this.projectNameService.update(this.projectName).subscribe(() => console.log('Update'));
  }

}
