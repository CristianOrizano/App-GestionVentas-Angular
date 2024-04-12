import { Component, OnInit } from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { Producto } from 'src/app/models/producto/producto';
import { Usuario } from 'src/app/models/user/usuario';
import { Usuariosave } from 'src/app/models/usuariosave/usuariosave.model';
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
  usuarioSave:Usuariosave= new Usuariosave();

   //var para la preview y para almacenar img y subir al server
   photoSelected: string | ArrayBuffer = "";
   file: File = new File([], 'default'); // Asignar un valor por defecto

  constructor(private serUsuario:UsuarioService, private storage: Storage){}

  ngOnInit(): void {
    this.getListUsuarios();
  }

  getListUsuarios() {
    this.serUsuario.listUsuarios().subscribe({
      next: (data) => {
        this.listUsuario = data;
        for (let item of this.listUsuario){  //bucle para asociar imagen a cada registro
          if(item.nimagen !="" && item.nimagen != null){     //mientras haya contenido en el nombre asociar
           //Obtener la URL de descarga de la imagen por nombre
         
           const imagesRef = ref(this.storage, `usuarios/${item.nimagen}`);
            getDownloadURL(imagesRef).then((url) => {
            item.fireimagen=url;  //almacenar la URL en una variable
           })
          }else{
            console.log("no hay imagen en el Storage")
          }  
        }


      }, error(error) {
        console.log(error);
      }
    })
  }
  updateUsuario(user:Usuariosave){

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
    data.authorities=[];
    this.usuarioSave= data;
     this.usuarioSave.enabled= data.enabled == true? false :true; 
     console.log("data",this.usuarioSave)
     this.updateUsuario(this.usuarioSave);
   }
 
}
