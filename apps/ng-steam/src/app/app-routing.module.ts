import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './routes/home/home.component';
import { FourzerofourComponent } from './routes/fourzerofour/fourzerofour.component';
import { AuthcallbackComponent } from './components/authcallback/authcallback.component';
import { SellComponent } from './routes/sell/sell.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: $localize`:@@homeTitle:Home | mono-nest-ng-steam` },
  },
  {
    path: 'sell',
    component: SellComponent,
    data: { title: $localize`:@@sellTitle:Sell | mono-nest-ng-steam` },
  },
  {
    path: 'auth/callback',
    component: AuthcallbackComponent,
    data: { title: 'Redirecting... | mono-nest-ng-steam' },
  },
  {
    path: '404',
    component: FourzerofourComponent,
    data: { title: $localize`:@@fourZeroFourTitle:404 | mono-nest-ng-steam` },
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
