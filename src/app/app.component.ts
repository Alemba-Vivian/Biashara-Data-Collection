import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from './authentication/services/authentication.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { get_user_roles_url } from './app.constants';
import { ToastService } from './common-module/shared-service/toast.service';
const READONLY = 'readonly_role';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'Application';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private toastService: ToastService,
    public authservice: AuthenticationService, private permissionsService: NgxPermissionsService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    this.checkifAuthenticated();
    this.disable_console();

    iconSetService.icons = { ...iconSubset };
  }
  disable_console() {
    // console.log = function() {};
   }

  checkifAuthenticated() {
    this.authservice.authenticationState.subscribe(state => {
      if (state) {
        const payload = {

        };

        this.authservice.getrecords(get_user_roles_url, payload).subscribe((res:any) => {
          const all_roles = res['group_name'];
          console.log('assinged roles', all_roles);

          this.permissionsService.addPermission(all_roles, (permissionName:any, permissionsObject) => {
            return !!permissionsObject[permissionName];
        });
          // this.router.navigate(['/landing/home']);
          let current_url = localStorage.getItem('current');
          if (current_url){
            this.router.navigate([current_url]);
          } else {
            // this.router.navigate(['/application/apply']);
            this.router.navigate(['/landing/home']);
          }
        });

      } else {
        let current_url = window.location.href;
        if(current_url.search('authentication') !== -1){
          this.router.navigate(['authentication/login']);
        } else {
          this.router.navigate(['/application/apply']);
        }
      }

    });
  }
  fetchpermissions() {


  }
  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
