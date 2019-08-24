import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageComponent } from './core/page/page.component';
import { EmployeesPageComponent } from './employee/employees-page/employees-page.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import {CompanySettingsComponent} from './company-setting/company-settings/company-settings.component';
import {ProjectComponent} from './projects/project/project.component';
import {ProfileComponent} from './profile-page/profile/profile.component';
import {TimelogComponent} from './timelogs/timelog/timelog.component';
import {TimesheetByWeekComponent} from './timelogs/timesheet-by-week/timesheet-by-week.component';
import {ProjectNameComponent} from './projects/project-name/project-name.component';
import { ExportComponent } from './components/export/export.component';

import {CompanyIntegrationComponent} from './company-setting/company-integration/company-integration.component';
import {ApprovalsPageComponent} from './approvals/approvals-page/approvals-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StartProfilePageComponent } from './profile-page/start-profile-page/start-profile-page.component'; 
const itemMenu: Routes = [
  { path: 'timelog-day', component: TimelogComponent},
  { path: 'timelog-week', component: TimesheetByWeekComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'projects/:project_name', component: ProjectNameComponent},
  { path: 'projects', component: ProjectComponent},
  { path: 'employees', component: EmployeesPageComponent},
  { path: 'company-settings', component: CompanySettingsComponent},
  { path: 'company-integration', component: CompanyIntegrationComponent},
  { path: 'employees/:employee_name', component: AddEmployeeComponent},
  { path: 'export', component: ExportComponent},
  { path: 'approvals', component: ApprovalsPageComponent},
  { path: 'start-profile', component: StartProfilePageComponent},
];
const routes: Routes = [
  { path: '', component: PageComponent, children: itemMenu},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
