import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { AuthorizationModule } from "./authorization/authorization.module";
import { CompanySettingModule} from "./company-setting/company-setting.module";
import { ComponentsModule} from "./components/components.module";
import {MaterialModule} from "./material.module";
import {EmployeeModule} from "./employee/employee.module";
import {TimelogsModule} from "./timelogs/timelogs.module";
import {ProjectsModule} from "./projects/projects.module";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import {ProfilePageModule} from "./profile-page/profile-page.module";

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

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
  ],
  entryComponents: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

  bootstrap: [AppComponent]
})
export class AppModule { }
