import { Component, OnInit } from '@angular/core';
import { RouteReuseStrategy, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
 linksMenu: Array<any> = [
  {name: ''}
 ]
  mainMenu: {defaultOptions: Array<any>, accessLink: Array<any>}=
  {defaultOptions: [], accessLink:[]}
  customOptions: Array<any>=[]
  
  constructor(private router: Router, private cookie: CookieService){}
  private rol = this.cookie.get('rol')
  ngOnInit(): void{
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'uil uil-estate',
        router: ['/', 'tracks']
      },
      {
        name: 'Buscar',
        icon: 'uil uil-search',
        router: ['/', 'history']
      },
      {
        name: 'Tu biblioteca',
        icon: 'uil uil-chart',
        router: ['/', 'favoritos'],
        query: { hola: 'mundo' }
      },
      // {
      //   name: 'Administración',
      //   icon: 'uil uil-setting',
      //   router: ['/', 'admin']
      // },
    ]
    console.log(this.rol , "soy el rol en el menu")
    if(this.rol == "admin"){
      this.mainMenu.defaultOptions.push(
        {
          name: 'Administración',
          icon: 'uil uil-setting',
          router: ['/', 'admin']
        }
      )
    }
    
    this.mainMenu.accessLink = [
      {
        name: 'Crear lista',
        icon: 'uil-plus-square'
      },
      {
        name: 'Canciones que te gustan',
        icon: 'uil-heart-medical'
      }
    ]
    this.customOptions = [
      {
        name: 'Cerrar Sesión',
        icon: 'uil uil-signout',
        router: ['/', 'auth']
      }

    ]
    
  }

}
