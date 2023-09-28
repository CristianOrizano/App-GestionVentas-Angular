import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './dashboard/auth/auth.component';
import { RegisterUserComponent } from './dashboard/register-user/register-user.component';
import { MainPageComponent } from './dashboard/main-page/main-page.component';
import { PageMainAdminComponent } from './dashboard/page-main-admin/page-main-admin.component';
import { EmpleadoCrudComponent } from './dashboard/empleado-crud/empleado-crud.component';
import { UsuarioCrudComponent } from './dashboard/usuario-crud/usuario-crud.component';
import { RoleAdminGuard } from './guard/role-admin.guard';
import { IsLoggedGuard } from './guard/is-logged.guard';
import { ProductoCrudComponent } from './dashboard/producto-crud/producto-crud.component';
import { ProductoAddComponent } from './dashboard/producto-crud/producto-add/producto-add.component';
import { ProductoUpdateComponent } from './dashboard/producto-crud/producto-update/producto-update.component';


const routes: Routes = [

  {path: 'dashboard', component: MainPageComponent,canActivate:[IsLoggedGuard],
  children:[
    {path:'',component:PageMainAdminComponent},
    {path:'empleado',component:EmpleadoCrudComponent,canActivate:[RoleAdminGuard]},
    {path:'usuario',component:UsuarioCrudComponent,canActivate:[RoleAdminGuard]},
    {path:'producto-list',component:ProductoCrudComponent,canActivate:[RoleAdminGuard]},
    {path:'producto-add',component:ProductoAddComponent,canActivate:[RoleAdminGuard]},
    {path:'producto-update/:idProd',component:ProductoUpdateComponent,canActivate:[RoleAdminGuard]},
  ]
  },
  {path: 'login', component: AuthComponent },
  {path: 'registro', component: RegisterUserComponent },
  {path: '', redirectTo:'login',pathMatch:'full' },
  {path: '**', redirectTo:'login',pathMatch:'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
