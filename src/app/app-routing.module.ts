import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterUserComponent } from './dashboard/register-user/register-user.component';

const routes: Routes = [
  {path: 'dashboard',  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  {path: 'login',loadChildren: () => import('./auth-login/auth-login.module').then(m => m.AuthLoginModule) },
  {path: 'registro', component: RegisterUserComponent },
  {path: '', redirectTo:'login',pathMatch:'full' },
  {path: '**', redirectTo:'login',pathMatch:'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
