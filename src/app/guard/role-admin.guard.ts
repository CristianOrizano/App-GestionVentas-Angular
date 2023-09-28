import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SignInService } from '../services/Sign-in/sign-in.service';

@Injectable({
  providedIn: 'root'
})
export class RoleAdminGuard implements CanActivate {

  constructor(private loginService:SignInService,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.loginService.isLoggedIn() && this.loginService.getUserRole() == 'ADMIN'){
        return true;
      }
      console.log("acceso denegado");
      this.router.navigate(['login']);
      return false;

  }
  
}
