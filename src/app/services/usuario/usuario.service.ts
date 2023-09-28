import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from 'src/app/helper/api-helper';
import { Usuario } from 'src/app/models/user/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  //metodo del la api para poder listar
  listUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${baseUrl}/usuario/lista`);
  }

  //metodo del la api para poder update
  Update(data:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${baseUrl}/usuario/actualiza`,data);
     }



}
