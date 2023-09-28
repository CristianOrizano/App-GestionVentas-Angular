
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccesToken } from 'src/app/models/AccesToken/acces-token';
import { Usuario } from 'src/app/models/user/usuario';
import { SignInService } from 'src/app/services/Sign-in/sign-in.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private formb:FormBuilder,private loginService:SignInService,private router:Router){

  }
  ngOnInit(): void {
    this.loginService.logout()
  }
  
  formUser = this.formb.group({
    'username': ["",[Validators.required,Validators.pattern('^[a-zA-Z0-9@.]+$')]],
    'password': ["",[Validators.required]],
 
   });

   SingIn(){

    const login= this.formUser.value;
    this.loginService.generateToken(login).subscribe({
      next: (data:AccesToken)=>{
        console.log(data);
        //guardar el token localstorage
        this.loginService.loginUser(data.tokenDeAcceso);
        //traer usuario actual(el tk esta adjuntado por el Interceptor)
        this.loginService.getCurrentUser().subscribe(
          (user:Usuario) => {
          //guardar usuario en el LocalStorage
          this.loginService.setUser(user);
         console.log("role "+  this.loginService.getUserRole())
         //mensaje de bienvenida .......
            Swal.fire('Mensaje', 'Bienvenido: '+user.username, 'success');
            this.router.navigate(['dashboard']);
        })
      },
      error:(error)=>{
        console.log("==>"+error.error.mensaje)
        if(error.error.mensaje=='User is disabled'){
          Swal.fire('Error','Su cuenta a sido Bloqueada consulte admin', 'info');
        }else{
          Swal.fire('Error', 'Sus credenciales son incorrectas', 'error');
        }
      
      }

   })

   }


}
