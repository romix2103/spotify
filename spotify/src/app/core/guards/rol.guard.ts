import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import{CookieService} from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class PermissionsService{
  constructor(private cookie: CookieService, public router: Router){}
 
   canActivateRol(): boolean{
   //console.log("cookie", this.cookie.check('token'))
   if(this.cookie.get('rol') == "admin"){
    return true
   }else{
    this.router.navigate(['/auth/login'])
    return false
   }
   
  
  }
 }
export const rolGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).canActivateRol();
};
