import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationComponent } from '../container/apply/main.component';

const routes: Routes = [
  {
    path: 'apply',
    component: ApplicationComponent,
    data: {
      title: 'Apply'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationcationRoutingModule { }
