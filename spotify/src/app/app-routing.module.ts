import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './example/example.component';
import { HomePageComponent } from '@modules/home/pages/home-page/home-page.component';

const routes: Routes = [
  {
    path:'auth', 
    loadChildren:()=> import('./modules/auth/auth.module').then(m => m.AuthModule)
  },

{
  path:'', //TODO: localhost:4200/
  component: HomePageComponent,
  loadChildren:()=> import('./modules/home/home.module').then(m => m.HomeModule)
},
{
  path:'example',
  component: ExampleComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
