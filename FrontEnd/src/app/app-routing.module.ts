import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import {StartComponent} from './components/start/start.component';
import {LoginComponent} from './components/login/login.component';

import { AuthGuard } from "./auth.guard";

const routes: Routes = [ 
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  },
  {
    path: 'start',
    component: StartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }