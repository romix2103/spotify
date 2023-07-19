import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';

const routes: Routes = [
   {
    path:'tracks',
    loadChildren:() => import('@modules/tracks/tracks-routing.module').then(m => m.TracksRoutingModule)
   },
   {
    path:'favorites',
    loadChildren:() => import('@modules/favorites/favorites-routing.module').then(m => m.FavoritesRoutingModule)
   },
   {
    path:'history',
    loadChildren:() => import('@modules/history/history-routing.module').then(m => m.HistoryRoutingModule)
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
