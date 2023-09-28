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

}
