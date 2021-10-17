import { NgModule } from '@angular/core';
import { BrowserModule, Meta, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { FourzerofourComponent } from './routes/fourzerofour/fourzerofour.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, FourzerofourComponent],
  imports: [AppRoutingModule, BrowserModule],
  providers: [Meta, Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
