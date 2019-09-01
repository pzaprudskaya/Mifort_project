import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Donut, Timelog} from './timelog.model';
import {TimelogsByDayService} from './timelogs-by-day.service';
import {UserService} from '../../core/logo-user-company/user.service';
import {Profile} from '../../employee/employee.model';
import {EmployeesService} from '../../employee/employee.service';

@Component({
  selector: 'app-by-day',
  templateUrl: './by-day.component.html',
  styleUrls: ['./by-day.component.sass']
})
export class ByDayComponent implements OnInit {
  @Output() changePeriod: EventEmitter<string> = new EventEmitter<string>();
  timeNow: string;
  toggleFlag: boolean;
  date: string;
  chooseDate;
  router: string;
  save: string;
  period: string;
  logs: any;
  timelogs: Timelog;
  dataDonut: Donut[];
  isShown = true;
  month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  employee: Profile;
  timelogByDay;

  constructor(private timelogsByDayService: TimelogsByDayService,
              private userService: UserService,
              private changeDetector: ChangeDetectorRef,
              private employeesService: EmployeesService) {
  }

  ngOnInit(): void {
    this.timeNow = '';
    this.save = '';
    this.toggleFlag = true;
    const today = new Date();
    this.date = today.getDate() + '/' + this.month[today.getMonth()] + '/' + today.getFullYear();
    this.chooseDate = today;
    this.period = 'select';
    this.timelogByDay = [];
    this.dataDonut = [];
    this.userService.userName$.subscribe((userName) => {
      this.employeesService.getEmployee(userName).subscribe(employee => {
        this.employee = employee[0];
      });
      this.timelogsByDayService.getLogs(userName).subscribe(
        timelogs => {
          [this.timelogs] = timelogs;
          this.timelogs.data.forEach((data) => {
            data.logs.forEach((item) => {
              debugger;
              const actual = item.time;
              const [employeeProject] = this.employee.employeeProjects.filter(project => project.name === item.projectName);
              const donut = new Donut(item.projectName, item.color, actual, employeeProject.time );
              this.dataDonut.push(donut);
            });
            debugger;
            this.timelogByDay.push({
              timelog: data,
              dataDonut: this.dataDonut
            });
            this.dataDonut = [];
          });
          this.filterByDay(this.date);
        });
    });
  }

  updateTimelogs(): void {
    let arr: any = [];
    arr = this.timelogs.data.map(obj => {
      if (obj.day === this.logs[0][0]) {
        return {day: obj.day, logs: this.logs[0][1]};
      } else {
        return obj;
      }
    });
    const myTimelog = new Timelog(this.timelogs.name, arr);
    this.timelogsByDayService.update(myTimelog).subscribe(() => console.log('Update!'));
  }

  filterByDay(day): void {
    debugger;

    [this.logs] = this.timelogByDay.filter((item) => item.timelog.day === day);
    if (this.logs === undefined) {
      // this.isShown = false;
      // this.changeDetector.detectChanges();
      this.logs = {timelog: {day: this.date, logs: []}, dataDonut: []};
      // this.isShown = true;
      // this.changeDetector.detectChanges();
      this.timelogByDay.push(this.logs);
      this.saveLogs();

    } else {
      this.isShown = false;
      this.changeDetector.detectChanges();
      this.logs = this.logs;
      this.isShown = true;
      this.changeDetector.detectChanges();
    }
  }

  saveLogs() {
    this.toggleFlag = false;
    const now = new Date();
    this.timeNow = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    this.updateTimelogs();
  }

  prevDate() {
    this.chooseDate.setDate(this.chooseDate.getDate() - 1);
    this.setDate();
  }

  nextDate() {
    this.chooseDate.setDate(this.chooseDate.getDate() + 1);
    this.setDate();
  }

  setDate() {
    this.date = this.chooseDate.getDate() + '/' + this.month[this.chooseDate.getMonth()] + '/' + this.chooseDate.getFullYear();
    this.filterByDay(this.date);
  }

  changeDonutChart(event) {
    this.isShown = false;
    this.changeDetector.detectChanges();
    for (let i = 0; i < this.dataDonut.length; i++) {
      if (i === event.id - 1) {
        const actual = Number(event.value);
        this.dataDonut[i].actual = actual;
      }
    }
    this.isShown = true;
    this.changeDetector.detectChanges();
  }
}
