import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';



import {MaterialModule} from "../material.module";
import {CoreModule} from "../core/core.module";
import {ComponentsModule} from "../components/components.module";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ProfileComponent} from "./profile/profile.component";




@NgModule({
  declarations: [
ProfileComponent
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
    ProfileComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class ProfilePageModule { }
