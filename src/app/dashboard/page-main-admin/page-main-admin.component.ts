import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-page-main-admin',
  templateUrl: './page-main-admin.component.html',
  styleUrls: ['./page-main-admin.component.css']
})
export class PageMainAdminComponent implements OnInit{

  totalClientes: number= 0;
  totalProductos: number= 0;
  totalCategorias: number= 0;
  totalUsuarios: number= 0;
  totalEmpleados: number= 0;


  constructor(private clienteService:ClienteService, private categoriaService: CategoriaService,
    private productoService: ProductoService,private empleadoService: EmpleadoService,private usuarioService: UsuarioService
  ) {
    
  }
  ngOnInit(): void {
    this.getListCliente();
    this.getListCategorias(),
    this.getListProductos();
    this.getListUsuarios();
    this.getListEmpleados();


  }

  getListCliente() {
    this.clienteService.listEmpls().subscribe({
      next: (data) => {
        this.totalClientes = data.length;
      }, error: (error) => {
        console.log("error en : " + error);
      }
    });
  }
  getListCategorias() {
    this.categoriaService.listarCategorias().subscribe({
      next: (data) => {
        this.totalCategorias = data.length;
      }, error: (error) => {
        console.log("error en : " + error);
      }
    });
  }

  getListUsuarios() {
    this.usuarioService.listUsuarios().subscribe({
      next: (data) => {
        this.totalUsuarios = data.length;   
      }, error(error) {
        console.log(error);
      }
    })
  }
  getListEmpleados() {
    this.empleadoService.listEmpls().subscribe({
      next: (data) => {
        this.totalEmpleados = data.length;
      }, error: (error) => {
        console.log("error en : " + error);
      }
    });
  }
  getListProductos() {
    this.productoService.listarProductos().subscribe({
      next: (data) => {
        this.totalProductos = data.length;
      }, error: (error) => {
        console.log("error en : " + error);
      }
    });
  }



}
