import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { AuthorizationModule } from './authorization/authorization.module';
import { CompanySettingModule} from './company-setting/company-setting.module';
import { ComponentsModule} from './components/components.module';
import {MaterialModule} from './material.module';
import {EmployeeModule} from './employee/employee.module';
import {TimelogsModule} from './timelogs/timelogs.module';
import {ProjectsModule} from './projects/projects.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import {ProfilePageModule} from './profile-page/profile-page.module';
import {HttpClientModule} from '@angular/common/http';
import {NotifierModule} from 'angular-notifier';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthorizationModule,
    CompanySettingModule,
    ComponentsModule,
    MaterialModule,
    EmployeeModule,
    TimelogsModule,
    ProjectsModule,
    ProfilePageModule,
    HttpClientModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
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
