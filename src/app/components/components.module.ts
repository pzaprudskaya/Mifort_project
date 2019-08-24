import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';


import {ApproveRejectForgetComponent} from './approve-reject-forget/approve-reject-forget.component';
import {DonutChartComponent} from './donut-chart/donut-chart.component';
import {ExportComponent} from './export/export.component';
import {IntegrationsComponent} from './integrations/integrations.component';
import {MonthlyWorkloadComponent} from './monthly-workload/monthly-workload.component';
import {NotificationPreferencesComponent} from './notification-preferences/notification-preferences.component';
import {PendingApprovalComponent} from './pending-approval/pending-approval.component';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {TableComponent} from './table/table.component';
import {WorkloadComponent} from './workload/workload.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';

import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material.module';
import {CommonModule} from '@angular/common';
import { ProgressBarsComponent } from './progress-bars/progress-bars.component';
import { TeamComponent } from './team/team.component';
import {NotificationComponent} from './notification/notification.component';
import {NotifierModule} from 'angular-notifier';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    ApproveRejectForgetComponent,
    DonutChartComponent,
    ExportComponent,
    IntegrationsComponent,
    MonthlyWorkloadComponent,
    NotificationPreferencesComponent,
    PendingApprovalComponent,
    ProgressBarComponent,
    TableComponent,
    WorkloadComponent,
    BarChartComponent,
    ProgressBarsComponent,
    TeamComponent,
    NotificationComponent,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
      radius: 17.5,
      space: -5,
      toFixed: 0,
      outerStrokeWidth: 5,
      outerStrokeColor: '#00C537',
      innerStrokeColor: '#e7e8ea',
      innerStrokeWidth: 5,
      titleColor: '#323C47',
      titleFontSize: '10',
      animation: false,
      showTitle: true,
      showUnits: true,
      showSubtitle: false,
      showBackground: false,
      clockwise: false,
      startFromZero: false,
      showZeroOuterStroke: false,
      lazy: false
    }),
    NotifierModule,
  ],
  exports: [
    ApproveRejectForgetComponent,
    DonutChartComponent,
    ExportComponent,
    IntegrationsComponent,
    MonthlyWorkloadComponent,
    NotificationPreferencesComponent,
    PendingApprovalComponent,
    ProgressBarComponent,
    TableComponent,
    WorkloadComponent,
    BarChartComponent,
    ProgressBarsComponent,
    TeamComponent,
    NotificationComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class ComponentsModule {
}
