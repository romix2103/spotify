import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleComponent } from './example/example.component';
import { FavoritesPageComponent } from './modules/favorites/pages/favorites-page/favorites-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
