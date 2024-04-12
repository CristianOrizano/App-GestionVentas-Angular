import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { PageMainAdminComponent } from './page-main-admin/page-main-admin.component';
import { EmpleadoCrudComponent } from './empleado-crud/empleado-crud.component';
import { UsuarioCrudComponent } from './usuario-crud/usuario-crud.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductoCrudComponent } from './producto-crud/producto-crud.component';
import { ProductoAddComponent } from './producto-crud/producto-add/producto-add.component';
import { ProductoUpdateComponent } from './producto-crud/producto-update/producto-update.component';
import { ProfileComponent } from './profile/profile.component';
import { CatalogoListComponent } from './catalogo-list/catalogo-list.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ClienteComponent } from './cliente/cliente.component';


@NgModule({
  declarations: [
    AuthComponent,
    RegisterUserComponent,
    MainPageComponent,
    PageMainAdminComponent,
    EmpleadoCrudComponent,
    UsuarioCrudComponent,
    ProductoCrudComponent,
    ProductoAddComponent,
    ProductoUpdateComponent,
    ProfileComponent,
    CatalogoListComponent,
    ConsultaComponent,
    CategoriaComponent,
    ClienteComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule
    
  ],
  exports: [
  ]
})
export class DashboardModule { }
