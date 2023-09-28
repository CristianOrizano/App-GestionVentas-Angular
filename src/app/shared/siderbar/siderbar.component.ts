import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user/usuario';
import { SignInService } from 'src/app/services/Sign-in/sign-in.service';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css']
})
export class SiderbarComponent implements OnInit {

  userRole:string = "";
  Username?:string="";
  constructor(private role:SignInService ,private infoUser:SignInService){
  }
  ngOnInit(): void {
    this.userRole = this.role.getUserRole();
    this.infoUser.getCurrentUser().subscribe({
    next:(data:Usuario)=>{
      this.Username= data.username;
    },error:(error)=>{
      alert("ocurrio un error");
    }

  })
 }


}
