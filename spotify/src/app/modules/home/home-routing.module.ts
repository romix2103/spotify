import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component';
import { rolGuard } from '@core/guards/rol.guard';

const routes: Routes = [
  {
    path:'favoritos',
    loadChildren:() => import('@modules/favorites/favorites.module').then(m => m.FavoritesModule)
   },
   {
    path:'tracks',
    loadChildren:() => import('@modules/tracks/tracks.module').then(m => m.TracksModule)
   },
  
   {
    path:'history',
    loadChildren:() => import('@modules/history/history.module').then(m => m.HistoryModule)
   },
   {
    path:'admin',
    loadChildren:() => import('@modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [rolGuard]
    //canActivate con el guard de la sesion rol = "admin"
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
