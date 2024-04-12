import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from 'src/app/helper/api-helper';
import { Categoria } from 'src/app/models/categoria/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  listarCategorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${baseUrl}/api/categoria`);
 }
 //metodo del la api para poder Registrar
 register(data:Categoria):Observable<Categoria>{
  return this.http.post<Categoria>(`${baseUrl}/api/categoria`,data);
   }

   //metodo del la api para poder update
   Update(data:Categoria,id:number):Observable<Categoria>{
    return this.http.put<Categoria>(`${baseUrl}/api/categoria/${id}`,data);
     }

      //metodo del la api para poder delet
   delete(idCli:number):Observable<any>{
  return this.http.delete<any>(`${baseUrl}/api/categoria/${idCli}`);
   }

}
