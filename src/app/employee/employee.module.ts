import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { EmployeeInformationComponent } from './employee-information/employee-information.component';
import { AddEmployeePopUpComponent } from './add-employee-pop-up/add-employee-pop-up.component';
import { EmployeesPageComponent } from './employees-page/employees-page.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import {MaterialModule} from '../material.module';
import {CoreModule} from '../core/core.module';
import {ComponentsModule} from '../components/components.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NotifierModule, NotifierOptions} from 'angular-notifier';


const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    EmployeeInformationComponent,
    AddEmployeePopUpComponent,
    EmployeesPageComponent,
    AddEmployeeComponent,

  ],
  imports: [
    RouterModule,
    MaterialModule,
    CoreModule,
    ComponentsModule,
    CommonModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  entryComponents: [
    AddEmployeePopUpComponent
  ],
  exports: [
    EmployeeInformationComponent,
    AddEmployeePopUpComponent,
    EmployeesPageComponent,
    AddEmployeeComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class EmployeeModule { }
