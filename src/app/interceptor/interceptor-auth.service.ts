import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInService } from '../services/Sign-in/sign-in.service';
import { Observable } from 'rxjs';


@Injectable()
export class InterceptorAuthService implements HttpInterceptor{

  constructor(private loginService:SignInService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("ENTRO AQUI interceptor "+JSON.stringify(req));
    let authReq  = req;
    const token = this.loginService.getToken();
    console.log("mando cualquier peticion con este token: "+token)
    if(token != null){
      authReq = authReq.clone({
        setHeaders : {Authorization: `Bearer ${token}` }
      })
    }
    return next.handle(authReq);
  }
}
export const authInterceptorProviders = [
  {
    provide : HTTP_INTERCEPTORS,
    useClass : InterceptorAuthService,
    multi : true
  }

]


