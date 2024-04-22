import { Component, OnInit } from '@angular/core';
import { BoletaResponse } from 'src/app/models/boleta/boleta.model';
import { VentaService } from 'src/app/services/venta/venta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-ventas',
  templateUrl: './listado-ventas.component.html',
  styleUrls: ['./listado-ventas.component.css']
})
export class ListadoVentasComponent implements OnInit{

  listaVentas:BoletaResponse[]=[];
  public page!:number;

  constructor(private ventaService: VentaService) {
  }


  ngOnInit(): void {
    this.getListVentas();
  }

  getListVentas() {
    this.ventaService.listarVentas().subscribe({
      next: (data) => {
        this.listaVentas = data;
      }, error: (error) => {
        alert("error en "+ error);

      }
    });
  }

  imprimir(){
    window.print();
  }



  

}
