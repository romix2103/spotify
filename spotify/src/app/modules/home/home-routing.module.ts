import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';

const routes: Routes = [{
  path:'', //le puedo dar el nombre del path
  component: SidebarComponent
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
