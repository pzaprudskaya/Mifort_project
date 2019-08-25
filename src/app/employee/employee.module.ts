import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AddEmployeePopUpComponent } from './add-employee-pop-up/add-employee-pop-up.component';
import { EmployeesPageComponent } from './employees-page/employees-page.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import {MaterialModule} from '../material.module';
import {CoreModule} from '../core/core.module';
import {ComponentsModule} from '../components/components.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {TablesModule} from '../tables/tables.module';
import {ProfileComponent} from "./profile/profile.component";




@NgModule({
  declarations: [
    AddEmployeePopUpComponent,
    EmployeesPageComponent,
    AddEmployeeComponent,
    ProfileComponent
  ],
  imports: [
    TablesModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    CoreModule,
    ComponentsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    AddEmployeePopUpComponent
  ],
  exports: [
    ProfileComponent,
    AddEmployeePopUpComponent,
    EmployeesPageComponent,
    AddEmployeeComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class EmployeeModule { }
