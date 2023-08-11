import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit{
formLogin: FormGroup = new FormGroup({})
constructor(private asAtuthService: AuthService, private cookie: CookieService, private router: Router){}
errorSession: boolean = false
  ngOnInit(): void {
    this.vaciarCookie()
  this.formLogin = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12)
    ])
  }
    
  )
//console.log('hola')
  
}
sendLogin():void{
  const {email, password} = this.formLogin.value
  this.asAtuthService.sendCredentials(email, password)
  .subscribe({
    next: (v) => {
      
      const {tokenSession, data} = v
      console.log("soy la data", data.role)
      this.cookie.set('token', tokenSession, 4, '/')
      this.cookie.set('rol', data.role, 4, '/')
      
      tokenSession != undefined? this.router.navigate(['/', 'tracks']) : this.errorSession = true
      //this.router.navigate(['/', 'tracks'])
    },
    error: (e) => {
      console.log("error", e)
      this.errorSession = true
    },
    complete: () => {
      
    }
})
}
vaciarCookie(){
  console.log("entró a limpiar token")
  this.cookie.delete('token')
}

}
