import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import{CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
//revisa las cookies
export class PermissionsService{
 constructor(private cookieService: CookieService, public router: Router){}
 canActivate(): boolean{
  if(this.cookieService.check('token')){
    return true
  }else{
    console.log("no pasas")
    this.router.navigate(['/auth/login'])
    return false
  }
 }
}

export const sessionGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivate();
};
