import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from 'src/app/helper/api-helper';
import { Ciudad } from 'src/app/models/ciudad/ciudad';
import { Estado } from 'src/app/models/estado/estado';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(private http:HttpClient) { }


  listCiudad():Observable<Ciudad[]>{
    return this.http.get<Ciudad[]>(`${baseUrl}/api/ciudad`);
  }

  listEstado():Observable<Estado[]>{
    return this.http.get<Estado[]>(`${baseUrl}/api/estado`);
  }

}
