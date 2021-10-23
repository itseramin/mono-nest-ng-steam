import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, Meta, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { AuthcallbackComponent } from './components/authcallback/authcallback.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './routes/home/home.component';
import { ExchangeComponent } from './routes/exchange/exchange.component';
import { FourzerofourComponent } from './routes/fourzerofour/fourzerofour.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    AuthcallbackComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ExchangeComponent,
    FourzerofourComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('jwt'),
      },
    }),
  ],
  providers: [Meta, Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
