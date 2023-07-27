import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExampleComponent } from './example/example.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
        
  ],
  imports: [ //solo modulos
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
