import { Component, OnInit } from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { Usuario } from 'src/app/models/user/usuario';
import { SignInService } from 'src/app/services/Sign-in/sign-in.service';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css'],
})
export class SiderbarComponent implements OnInit {
  userRole: string = '';
  Username?: string = '';
  usuario: Usuario = new Usuario();

  constructor(
    private role: SignInService,
    private infoUser: SignInService,
    private storage: Storage
  ) {}
  ngOnInit(): void {
    this.userRole = this.role.getUserRole();
    this.infoUser.getCurrentUser().subscribe({
      next: (data: Usuario) => {
        this.Username = data.username;
        this.usuario = data;
        this.getImage();
      },
      error: (error) => {
        alert('ocurrio un error');
      },
    });
  }
  getImage() {
    if (this.usuario.nimagen != '' ) {
      //mostrale la imagen si hay contenido
      const imagesRef = ref(this.storage, `usuarios/${this.usuario.nimagen}`);
      // Obtener la URL de descarga de la imagen
      getDownloadURL(imagesRef).then((url) => {
        this.usuario.fireimagen = url;
      });
    } else {
      console.log('no hay imagen');
    }
  }
}
