import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from 'src/app/helper/api-helper';
import { Boleta, BoletaResponse } from 'src/app/models/boleta/boleta.model';
import { CarritoSave } from 'src/app/models/producto/producto';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
  carrito: CarritoSave[] = [];

  constructor(private http: HttpClient) {
    this.carrito = this.cargarCarrito();
  }

  agregarAlCarrito(carritoSave: CarritoSave) {
    console.log('Carro', this.carrito);
    console.log('Code carrito', carritoSave.codigoele);
    if (
      !this.carrito.some((item) => item.codigoele === carritoSave.codigoele)
    ) {
      console.log('entro aqui=====>');
      this.carrito.push(carritoSave);
      this.actualizarLocalStorage();
    }
  }

  eliminarDelCarrito(carritoSave: CarritoSave) {
    const index = this.carrito.findIndex(
      (item) => item.codigoele === carritoSave.codigoele
    );
    if (index !== -1) {
      this.carrito.splice(index, 1); // Elimina el producto del carrito
      this.actualizarLocalStorage();
    }
  }

  actualizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  aumentarRestar(carr: CarritoSave) {
    const index = this.carrito.findIndex(
      (item) => item.codigoele === carr.codigoele
    );
    if (index !== -1) {
      this.carrito[index] = carr;
      this.actualizarLocalStorage();
    }
  }
  public limpiarCarro() {
    localStorage.removeItem('carrito');
    this.carrito = [];
  }

  cargarCarrito(): CarritoSave[] {
    const carritoLocalStorage = localStorage.getItem('carrito');
    if (carritoLocalStorage) {
      return JSON.parse(carritoLocalStorage);
    } else {
      return [];
    }
  }

  generarVenta(data: Boleta): Observable<Boleta> {
    return this.http.post<Boleta>(`${baseUrl}/api/boleta`, data);
  }

  listarVentas(): Observable<BoletaResponse[]> {
    return this.http.get<BoletaResponse[]>(`${baseUrl}/api/boleta`);
  }
}
