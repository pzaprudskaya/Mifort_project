import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {ComponentsModule} from '../components/components.module';
import {CoreModule} from '../core/core.module';
import {MaterialModule} from '../material.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {TablesModule} from '../tables/tables.module';
import {ByDayComponent} from './by-day/by-day.component';
import {ByWeekComponent} from './by-week/by-week.component';







@NgModule({
  declarations: [
    ByDayComponent,
    ByWeekComponent,
  ],
  imports: [
    TablesModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    CoreModule,
    ComponentsModule,
    CommonModule,
  ],
  entryComponents: [
  ],
  exports: [
    ByDayComponent,
    ByWeekComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class TimesheetsModule { }
