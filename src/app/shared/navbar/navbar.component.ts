import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SignInService } from 'src/app/services/Sign-in/sign-in.service';
import { SignUpService } from 'src/app/services/Sign-up/sign-up.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private signOut:SignInService,private router: Router){
  }

  logout(){
    this.signOut.logout()
    this.router.navigate(['/login']);
  }

}
