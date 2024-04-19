import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationcationRoutingModule } from './application-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationComponent  } from '../container/apply/main.component';
import { CommonSharedModule } from '../../common-module/common-module/common-module.module';
@NgModule({
  declarations: [ApplicationComponent],
  imports: [
    CommonModule,
    FormsModule,
    CommonSharedModule,
    ReactiveFormsModule,
    ApplicationcationRoutingModule
  ],
})
export class AuthenticationModule { }
