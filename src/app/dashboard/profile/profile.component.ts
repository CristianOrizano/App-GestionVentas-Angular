import { Component, OnInit } from '@angular/core';
import { Storage, deleteObject, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/user/usuario';
import { SignInService } from 'src/app/services/Sign-in/sign-in.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuarioModel: Usuario = new Usuario();
  usuario: Usuario = new Usuario();
  usuarioSave: Usuario = new Usuario();
  nameImageDelet: string = "";
  // Declaración del formulario reactivo
  formProducto: FormGroup;

  //var para la preview y para almacenar img y subir al server
  photoSelected: string | ArrayBuffer = "";
  file: File = new File([], 'default'); // Asignar un valor por defecto

  constructor(private router: Router, private serUser: UsuarioService, private form: FormBuilder, private storage: Storage) {
    this.formProducto = this.form.group({
      'imagen': [""],
    });
  }
  ngOnInit(): void {
    
   this.getUsuario();
  }

  getUsuario(){
    this.serUser.usuarioActual().subscribe({
      next: (data: Usuario) => {
          this.usuarioModel = data;
          this.getImage();
      },
      error: (error) => {
          console.error("Error al obtener el usuario actual:", error);
      }
  });
  }

  
  assignValue() {
    this.usuarioSave.id_usuario = this.usuarioModel.id_usuario;
    this.usuarioSave.nombre = this.usuarioModel.nombre;
    this.usuarioSave.apellido = this.usuarioModel.apellido;
    this.usuarioSave.email = this.usuarioModel.email;
    this.usuarioSave.enabled = this.usuarioModel.enabled;
    this.usuarioSave.username = this.usuarioModel.username;
    this.usuarioSave.password = this.usuarioModel.password;
    this.usuarioSave.nimagen = this.usuarioModel.nimagen;
    this.usuarioSave.roles = this.usuarioModel.roles;
  }
 

  UpdateUsername() {
    this.assignValue();
    this.usuarioSave.nimagen=this.file.name
    this.serUser.Update(this.usuarioSave).subscribe({
      next: (data: any) => {
        Swal.fire('Mensaje', 'Exito al Actualizar', 'success');
        location.reload();       
      },
      error: (error) => {
        console.error(error);
        Swal.fire('Error', 'Hubo un problema al registrar el usuario', 'error');
      }
    });
  }


  UpdateImage() {
    if (this.nameImageDelet != "") {
      this.uploadPhoto();
      this.DeleteImage();
    
    } else {
      this.uploadPhoto();
     
    }
  }

  getImage() {
    this.formProducto.reset(); //limpia el file
    if (this.usuarioModel.nimagen != "") {//mostrale la imagen si hay contenido
      this.nameImageDelet = this.usuarioModel.nimagen;//si cambia guardo el name antiguo
      const imagesRef = ref(this.storage, `usuarios/${this.usuarioModel.nimagen}`);
      // Obtener la URL de descarga de la imagen
      getDownloadURL(imagesRef).then((url) => {
        this.photoSelected = url;
        this.usuarioModel.fireimagen=url
      })
    } else {
      console.log("no hay imagen")
      this.photoSelected = ""
    }
  }

  //pre-View-Image
  onPhotoSelected(event: any): void {
    //asegurarse de que eligio un archivo
    if (event.target.files && event.target.files.length > 0) {
      this.file = <File>event.target.files[0];
      console.log(event);
      console.log(this.file);
      //para leer contenido
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result!;
      reader.readAsDataURL(this.file);

    } else {
      //no almacena nada la var pre-view
      this.photoSelected = ""
      console.log("esta vacio");
    }
  }

  //upload photo to server
  uploadPhoto() {
    if (this.photoSelected != "") {
      console.log("imagen al servidor")
      const imgRef = ref(this.storage, `usuarios/${this.file.name}`);
      uploadBytes(imgRef, this.file)
        .then(response => {
          this.UpdateUsername();
        })
        .catch(error => console.log(error));
    } else {
      console.log("imagen vacio no subo nada al servidor")
    }
  }

  //eliminar img por su nombre
  DeleteImage() {
    const imagesRef = ref(this.storage, `usuarios/${this.nameImageDelet}`);
    deleteObject(imagesRef)
      .then(() => {
        console.log("Imagen eliminada con éxito");
      })
      .catch((error) => {
        console.error("Error al eliminar la imagen:", error);
      });
  }


}
