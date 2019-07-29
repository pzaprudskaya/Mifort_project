import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';


import { HeadComponent } from './head/head.component';
import { TimesheetByWeekComponent } from './timesheet-by-week/timesheet-by-week.component';
import { TimelogComponent } from './timelog/timelog.component';
import {ComponentsModule} from '../components/components.module';
import {CoreModule} from '../core/core.module';
import {MaterialModule} from '../material.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';






@NgModule({
  declarations: [
    TimesheetByWeekComponent,
    TimelogComponent,
    HeadComponent,
  ],
  imports: [
    RouterModule,
    MaterialModule,
    CoreModule,
    ComponentsModule,
    CommonModule,
  ],
  entryComponents: [
  ],
  exports: [
    TimesheetByWeekComponent,
    TimelogComponent,
    HeadComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class TimelogsModule { }
