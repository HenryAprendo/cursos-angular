import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { BasicFormComponent } from './components/basic-form/basic-form.component';
import { BasicValidComponent } from './components/basic-valid/basic-valid.component';
import { FormGroupComponent } from './components/form-group/form-group.component';
import { FormSubgroupComponent } from './components/form-subgroup/form-subgroup.component';
import { MaterialComponent } from './components/material/material.component';
import { FormArrayComponent } from './components/form-array/form-array.component';
import { TemplateComponent } from './components/template/template.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'basic-form',
        pathMatch: 'full'
      },
      {
        path: 'basic-form',
        component: BasicFormComponent
      },
      {
        path: 'basic-valid',
        component: BasicValidComponent
      },
      {
        path: 'form-group',
        component: FormGroupComponent
      },
      {
        path:'form-subgroup',
        component: FormSubgroupComponent
      },
      {
        path: 'material',
        component: MaterialComponent
      },
      {
        path: 'form-array',
        component: FormArrayComponent
      },
      {
        path: 'template',
        component: TemplateComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRoutingModule { }
