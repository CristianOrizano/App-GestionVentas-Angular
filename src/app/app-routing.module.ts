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
import { ProfileComponent } from './dashboard/profile/profile.component';
import { CatalogoListComponent } from './dashboard/catalogo-list/catalogo-list.component';
import { ConsultaComponent } from './dashboard/consulta/consulta.component';
import { CategoriaComponent } from './dashboard/categoria/categoria.component';
import { ClienteComponent } from './dashboard/cliente/cliente.component';
import { VentaComponent } from './dashboard/venta/venta.component';
import { ListadoVentasComponent } from './dashboard/listado-ventas/listado-ventas.component';


const routes: Routes = [

  {path: 'dashboard', component: MainPageComponent,
  children:[
    {path:'',component:PageMainAdminComponent},
    {path:'empleado',component:EmpleadoCrudComponent,canActivate:[RoleAdminGuard]},
    {path:'cliente',component:ClienteComponent,canActivate:[RoleAdminGuard]},
    {path:'categoria',component:CategoriaComponent,canActivate:[RoleAdminGuard]},
    {path:'usuario',component:UsuarioCrudComponent,canActivate:[RoleAdminGuard]},
    {path:'producto-list',component:ProductoCrudComponent,canActivate:[RoleAdminGuard]},
    {path:'producto-add',component:ProductoAddComponent,canActivate:[RoleAdminGuard]},
    {path:'producto-update/:idProd',component:ProductoUpdateComponent,canActivate:[RoleAdminGuard]},
    {path:'profile',component:ProfileComponent,canActivate:[IsLoggedGuard]},
    {path:'venta',component:VentaComponent,canActivate:[IsLoggedGuard]},
    {path:'listar-ventas',component:ListadoVentasComponent,canActivate:[IsLoggedGuard]},
    {path:'consulta',component:ConsultaComponent,canActivate:[IsLoggedGuard]}, 
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
