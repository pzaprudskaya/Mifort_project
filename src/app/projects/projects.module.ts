import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CreateProjectComponent} from './create-project/create-project.component';
import {ProjectNameComponent} from './project-name/project-name.component';
import {ProjectComponent} from './project/project.component';
import {ProgressComponent} from './progress/progress.component';
import {MaterialModule} from '../material.module';
import {CoreModule} from '../core/core.module';
import {ComponentsModule} from '../components/components.module';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';




@NgModule({
  declarations: [
    ProgressComponent,
    ProjectComponent,
    ProjectNameComponent,
    CreateProjectComponent,
  ],
  imports: [
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
    CreateProjectComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class ProjectsModule { }
