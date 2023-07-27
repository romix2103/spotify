//import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {tap} from 'rxjs'
import {CookieService} from 'ngx-cookie-service'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api
  constructor(private http: HttpClient, private cookie: CookieService) { }

  //todo observable necesita una suscripción
  sendCredentials(email: string, password: string): Observable<any> {
    
    const body = {
      email,
      password
    }
    console.log(environment)
    return this.http.post(`${this.URL}/auth/login`, body).pipe(tap(
      (responseOk: any) =>{
      const {tokensession, data} = responseOk
      this.cookie.set('token_servicio', tokensession, 4, '/')
    }
     

      ))
  }

  suma(a: number, b: number): number {
    return a + b
  }
}