import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from 'src/app/helper/api-helper';
import { Cliente } from 'src/app/models/cliente/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  //metodo del la api para poder listar
listEmpls():Observable<Cliente[]>{
return this.http.get<Cliente[]>(`${baseUrl}/api/cliente`);
}

//metodo del la api para poder Registrar
register(data:Cliente):Observable<Cliente>{
return this.http.post<Cliente>(`${baseUrl}/api/cliente`,data);
 }

 //metodo del la api para poder update
 Update(data:Cliente,id:number):Observable<Cliente>{
  return this.http.put<Cliente>(`${baseUrl}/api/cliente/${id}`,data);
   }

    //metodo del la api para poder delet
 delete(idCli:number):Observable<any>{
return this.http.delete<any>(`${baseUrl}/api/cliente/${idCli}`);
 }
}
