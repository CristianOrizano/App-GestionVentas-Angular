import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto/producto';
import { Usuario } from 'src/app/models/user/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-crud',
  templateUrl: './usuario-crud.component.html',
  styleUrls: ['./usuario-crud.component.css']
})
export class UsuarioCrudComponent implements OnInit {

  public page!:number;
  //lista de usuario
  listUsuario:Usuario[]=[];
  usuarioModel:Usuario= new Usuario();

  constructor(private serUsuario:UsuarioService){}

  ngOnInit(): void {
    this.getListUsuarios();
  }

  getListUsuarios() {
    this.serUsuario.listUsuarios().subscribe({
      next: (data) => {
        this.listUsuario = data;
      }, error(error) {
        console.log(error);
      }
    })
  }
  updateUsuario(user:Usuario){
    this.serUsuario.Update(user).subscribe({
      next: (data:any) => {
        Swal.fire('Mensaje','Exito al Actualizar Estado','success');
        this.getListUsuarios();
      },
      error: (error) => {
        console.error(error);
        Swal.fire('Error', 'Hubo un problema al registrar el usuario', 'error');
      }
   });
  }


  toggleEstado(data:Usuario) {
    this.usuarioModel.id_usuario=data.id_usuario;
    this.usuarioModel.email=data.email;
    this.usuarioModel.nombre=data.nombre;
    this.usuarioModel.apellido=data.apellido;
    this.usuarioModel.username=data.username;
    this.usuarioModel.password=data.password;
    this.usuarioModel.roles=data.roles;
    this.usuarioModel.nimagen=data.nimagen;
    this.usuarioModel.enabled = data.enabled == true? false :true;   
    this.updateUsuario(this.usuarioModel);
  }






}
