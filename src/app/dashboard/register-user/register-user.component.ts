import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/user/usuario';
import { SignUpService } from 'src/app/services/Sign-up/sign-up.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  usuario: Usuario=new Usuario()
 
  constructor(private formb:FormBuilder,private signUp:SignUpService){

  }
  formUser = this.formb.group({
    'nombre': ["",[Validators.required,Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{5,30}')]],
    'apellido': ["",[Validators.required,Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{5,30}')]],
    'email': ["",[Validators.required,Validators.email]],
    'username': ["",[Validators.required,Validators.minLength(5),Validators.maxLength(30)]],
    'password': ["",[Validators.required,Validators.minLength(5),Validators.maxLength(30)]]
 
   });
 
   singUp(){
    //se puede usar para traer los datos del form
    const formData = this.formUser.value;
    console.log(formData);
    this.signUp.addUser(this.usuario).subscribe({
      next: (data:any) => {
        console.log(data);
        // Restablecer el formulario a su estado inicial
         this.formUser.reset();
        Swal.fire('Mensaje',data.mensaje,'success');
      },
      error: (error) => {
        // Manejar errores si es necesario
        console.error(error);
        Swal.fire('Error', 'Hubo un problema al registrar el usuario', 'error');
      }
   });
    
   }


}
