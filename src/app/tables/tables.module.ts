import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ComponentsModule} from '../components/components.module';
import {CoreModule} from '../core/core.module';
import {MaterialModule} from '../material.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {TableForDayComponent} from './table-for-day/table-for-day.component';
import {TableForProjectComponent} from './table-for-project/table-for-project.component';
import {TableForTeamComponent} from './table-for-team/table-for-team.component';
import {TableForWeekComponent} from './table-for-week/table-for-week.component';


@NgModule({
  declarations: [
    TableForDayComponent,
    TableForProjectComponent,
    TableForTeamComponent,
    TableForWeekComponent
  ],
  imports: [
    FormsModule,
    RouterModule,
    MaterialModule,
    CoreModule,
    ComponentsModule,
    CommonModule
  ],
  entryComponents: [
  ],
  exports: [
    TableForDayComponent,
    TableForProjectComponent,
    TableForTeamComponent,
    TableForWeekComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class TablesModule { }
