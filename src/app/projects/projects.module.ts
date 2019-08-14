import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ProjectNameComponent} from './project-name/project-name.component';
import {ProjectComponent} from './project/project.component';
import {ProgressComponent} from './progress/progress.component';
import {MaterialModule} from '../material.module';
import {CoreModule} from '../core/core.module';
import {ComponentsModule} from '../components/components.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {TablesModule} from '../tables/tables.module';




@NgModule({
  declarations: [
    ProgressComponent,
    ProjectComponent,
    ProjectNameComponent
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
    ProgressComponent,
    ProjectComponent,
    ProjectNameComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class ProjectsModule { }
