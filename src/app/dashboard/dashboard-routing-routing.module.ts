import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { EmpleadoCrudComponent } from './empleado-crud/empleado-crud.component';
import { RoleAdminGuard } from '../guard/role-admin.guard';
import { ClienteComponent } from './cliente/cliente.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { UsuarioCrudComponent } from './usuario-crud/usuario-crud.component';
import { ProductoCrudComponent } from './producto-crud/producto-crud.component';
import { ProductoAddComponent } from './producto-crud/producto-add/producto-add.component';
import { ProductoUpdateComponent } from './producto-crud/producto-update/producto-update.component';
import { ProfileComponent } from './profile/profile.component';
import { VentaComponent } from './venta/venta.component';
import { ListadoVentasComponent } from './listado-ventas/listado-ventas.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { IsLoggedGuard } from '../guard/is-logged.guard';
import { PageMainAdminComponent } from './page-main-admin/page-main-admin.component';

const routes: Routes = [
  { 
    path: '', 
    component: MainPageComponent,canActivate:[IsLoggedGuard],
    children: [
      {path:'',component:PageMainAdminComponent,canActivate:[IsLoggedGuard]},
      { path: 'emple', component: EmpleadoCrudComponent, canActivate: [RoleAdminGuard] },
      {path:'cliente',component:ClienteComponent,canActivate:[IsLoggedGuard]},
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
  }
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingRoutingModule { }
