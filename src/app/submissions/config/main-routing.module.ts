import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { AuthenticationGuard } from '../../authentication/guards/authguard.guard';
import { ChangePasswordGuard } from '../../authentication/guards/change-password.guard';
import { ViewApplicationsComponent } from '../container/view/main.component';
import { DetailApplicationComponent } from '../container/detail/main.component';
import { ViewSalaryRequestsComponent } from '../container/salary/main.component';

const routes: Routes = [
  {
    path: 'view/:id',
    component: DetailApplicationComponent,
    data: {
      title: 'View Request',
      permissions: {
        only: ['USER_MANAGER',],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'list',
    component: ViewApplicationsComponent,
    data: {
      title: 'Submissions',
      permissions: {
        only: ['USER_MANAGER','VIEWER'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },
  {
    path: 'salary',
    component: ViewSalaryRequestsComponent,
    data: {
      title: 'Salary Requests',
      permissions: {
        only: ['USER_MANAGER','ADMINISTRATOR','USER','HOD','SLT', 'CEO', 'HOF'],
        redirectTo: '/500'
      }
    },
    canActivate: [AuthenticationGuard, ChangePasswordGuard, NgxPermissionsGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule { }
