import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { BasicRoutingModule } from './basic-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { BasicFormComponent } from './components/basic-form/basic-form.component';
import { BasicValidComponent } from './components/basic-valid/basic-valid.component';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { FormSubgroupComponent } from './components/form-subgroup/form-subgroup.component';
import { MaterialComponent } from './components/material/material.component';
import { FormArrayComponent } from './components/form-array/form-array.component';
import { TemplateComponent } from './components/template/template.component';


@NgModule({
  declarations: [
    LayoutComponent,
    BasicFormComponent,
    BasicValidComponent,
    FormGroupComponent,
    FormSubgroupComponent,
    MaterialComponent,
    FormArrayComponent,
    TemplateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BasicRoutingModule,
    MaterialModule
  ]
})
export class BasicModule { }
