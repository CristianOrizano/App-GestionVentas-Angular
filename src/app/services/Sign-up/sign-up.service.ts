import { Injectable } from '@angular/core';
import baseUrl from '../../helper/api-helper';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/user/usuario';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http:HttpClient) { }

  public addUser(user:Usuario){
    return this.http.post(`${baseUrl}/usuario/registrar`,user);
  }
}
