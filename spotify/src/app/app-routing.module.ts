import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './example/example.component';

const routes: Routes = [
{
  path:'', //TODO: localhost:4200/
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
