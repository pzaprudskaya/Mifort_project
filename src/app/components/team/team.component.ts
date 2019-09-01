import {Component, Input, OnInit} from '@angular/core';
import {ProjectsService} from '../../projects/project/projects.service';
import {ProjectNameService} from '../../projects/project-name/project-name.service';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.sass']
})
export class TeamComponent implements OnInit {
  @Input() project;
  projectName;
  lastCircle: boolean;
  lastCircleValue: number;
  teamList: string[];
  teamListNext: string[];


  constructor(private projectsService: ProjectsService,
              private projectNameService: ProjectNameService) {
  }

  ngOnInit() {
    this.lastCircle = false;
    this.projectNameService.getProject(this.project.name).subscribe((projectName) => {
      this.projectName = projectName[0];
    });
    if (this.project.team.length > 12) {
      this.lastCircle = true;
      this.teamList = this.project.team.slice(0, 12);
      this.teamListNext = this.project.team.slice(12, this.project.team.length);
      this.lastCircleValue = this.teamListNext.length;
    } else {
      this.teamList = this.project.team;
    }
  }


  changeCircleActivity(item) {
    item.active = !item.active;
  }

  showAllTeam() {
    if (this.lastCircleValue !== this.teamList.length) {
      this.teamList = this.teamList.concat(this.teamListNext);
      this.lastCircle = false;
    }
  }

  delete(item) {
    this.project.team.forEach((employee, i) => {
      if (employee.id === item.id) {
        this.project.team.splice(i, 1);
      }
    });
    this.projectsService.update(this.project).subscribe(() => console.log('Update'));

    this.projectName.team = this.project.team;
    this.projectNameService.update(this.projectName).subscribe(() => console.log('Update'));
  }
}
