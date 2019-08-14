import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ComponentsModule} from '../components/components.module';
import {CoreModule} from '../core/core.module';
import {MaterialModule} from '../material.module';
import {CommonModule} from '@angular/common';
import {ApprovalsPageComponent} from './approvals-page/approvals-page.component';
import {RouterModule} from '@angular/router';
import {DatepickerComponent} from './datepicker/datepicker.component';
import {FormsModule} from '@angular/forms';
import {DialogChangeStatusComponent} from './dialog-change-status/dialog-change-status.component';



@NgModule({
  declarations: [
    ApprovalsPageComponent,
    DialogChangeStatusComponent,
    DatepickerComponent
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
    DialogChangeStatusComponent
  ],
  exports: [
    ApprovalsPageComponent,
    DialogChangeStatusComponent,
    DatepickerComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class ApprovalsPageModule { }
