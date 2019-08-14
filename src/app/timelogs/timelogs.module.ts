import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';


import { HeadComponent } from './head/head.component';
import { TimesheetByWeekComponent } from './timesheet-by-week/timesheet-by-week.component';
import { TimelogComponent } from './timelog/timelog.component';
import {ComponentsModule} from '../components/components.module';
import {CoreModule} from '../core/core.module';
import {MaterialModule} from '../material.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ApprovalsPageModule} from '../approvals/approvals-page.module';
import {TablesModule} from '../tables/tables.module';






@NgModule({
  declarations: [
    TimesheetByWeekComponent,
    TimelogComponent,
    HeadComponent,
  ],
  imports: [
    TablesModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    CoreModule,
    ComponentsModule,
    CommonModule,
    ApprovalsPageModule,
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
