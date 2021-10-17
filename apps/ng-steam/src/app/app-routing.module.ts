import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './routes/home/home.component';
import { FourzerofourComponent } from './routes/fourzerofour/fourzerofour.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: $localize`:@@homeTitle:Home | Angular Playground` },
  },
  {
    path: '404',
    component: FourzerofourComponent,
    data: { title: $localize`:@@fourZeroFourTitle:404 | Angular Playground` },
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
