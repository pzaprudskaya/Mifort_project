import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { AuthorizationModule } from './authorization/authorization.module';
import { CompanySettingModule} from './company-setting/company-setting.module';
import { ComponentsModule} from './components/components.module';
import {MaterialModule} from './material.module';
import {EmployeeModule} from './employee/employee.module';
import {ProjectsModule} from './projects/projects.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import {HttpClientModule} from '@angular/common/http';
import {NotifierModule} from 'angular-notifier';
import {ApprovalsPageModule} from './approvals/approvals-page.module';

import {TablesModule} from './tables/tables.module';
import {TimesheetsModule} from './timesheets/timesheets.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule,
    AuthorizationModule,
    CompanySettingModule,
    ApprovalsPageModule,
    ComponentsModule,
    MaterialModule,
    EmployeeModule,
    ProjectsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    TablesModule,
    BrowserAnimationsModule,
    ChartsModule,
    TimesheetsModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
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
        autoHide: false,
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
    })
  ],
  entryComponents: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

  bootstrap: [AppComponent]
})
export class AppModule { }
