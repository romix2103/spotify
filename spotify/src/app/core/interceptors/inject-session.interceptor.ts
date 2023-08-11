import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class InjectSessionInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    try{
      const token = this.cookieService.get('token')
      console.log("Interceptor token", token)
      let newRequest = request;
      newRequest = request.clone({
        setHeaders: {
          autorization: `Bearer ${token}`,
          CUSTOM_HEADER: 'Encabezado Custom'
        }
      })
      return next.handle(newRequest)
    }catch(e){
      console.log("Error interceptor", request)
      return next.handle(request);
    }
    
 
  }
}
