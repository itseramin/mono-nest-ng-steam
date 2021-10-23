import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './routes/home/home.component';
import { FourzerofourComponent } from './routes/fourzerofour/fourzerofour.component';
import { AuthcallbackComponent } from './components/authcallback/authcallback.component';
import { ExchangeComponent } from './routes/exchange/exchange.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: $localize`:@@homeTitle:Home | mono-nest-ng-steam` },
  },
  {
    path: 'exchange',
    component: ExchangeComponent,
    data: { title: $localize`:@@sellTitle:Exchange | mono-nest-ng-steam` },
  },
  {
    path: 'auth',
    children: [
      {
        path: 'callback',
        component: AuthcallbackComponent,
        data: { title: 'Redirecting... | mono-nest-ng-steam' },
      },
      {
        path: 'requirementsnotmet',
        component: AuthcallbackComponent,
        data: { title: ':( | mono-nest-ng-steam' },
      },
    ],
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
