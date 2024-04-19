import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ViewApplicationsComponent } from '../container/view/main.component';
import { DetailApplicationComponent } from '../container/detail/main.component';
import { ViewSalaryRequestsComponent } from '../container/salary/main.component';
import { CommonSharedModule } from '../../common-module/common-module/common-module.module';


@NgModule({
  declarations: [
    ViewApplicationsComponent,
    DetailApplicationComponent,
    ViewSalaryRequestsComponent
  ],
  imports: [
    CommonSharedModule,
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
