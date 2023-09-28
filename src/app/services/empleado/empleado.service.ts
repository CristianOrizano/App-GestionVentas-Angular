import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from 'src/app/helper/api-helper';
import { Empleado } from 'src/app/models/empleado/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }

    //metodo del la api para poder listar
 listEmpls():Observable<Empleado[]>{
  return this.http.get<Empleado[]>(`${baseUrl}/api/res/empleado`);
}

 //metodo del la api para poder Registrar
 register(data:Empleado):Observable<Empleado>{
  return this.http.post<Empleado>(`${baseUrl}/api/res/empleado`,data);
   }

   //metodo del la api para poder update
   Update(data:Empleado):Observable<Empleado>{
    return this.http.put<Empleado>(`${baseUrl}/api/res/empleado`,data);
     }

      //metodo del la api para poder delet
   delete(idCli:number):Observable<any>{
  return this.http.delete<any>(`${baseUrl}/api/res/empleado/${idCli}`);
   }

}
