import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from 'src/app/helper/api-helper';
import { Producto } from 'src/app/models/producto/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  constructor(private http: HttpClient) { }

  listarProductos():Observable<Producto[]>{
     return this.http.get<Producto[]>(`${baseUrl}/api/productos`);
  }

  //metodo del la api para poder Registrar
 register(data:Producto):Observable<Producto>{
  return this.http.post<any>(`${baseUrl}/api/productos`,data);
   }

   //metodo del la api para poder update
   Update(data:Producto):Observable<Producto>{
    return this.http.put<any>(`${baseUrl}/api/productos`,data);
     }

     //metodo del la api para poder buscar
   FindByIDProducto(codigo:number):Observable<Producto>{
      return this.http.get<any>(`${baseUrl}/api/productos/${codigo}`);
       }

      //metodo del la api para poder delet
   delete(idProd:number):Observable<any>{
  return this.http.delete<any>(`${baseUrl}/api/productos/${idProd}`);
   }





}
