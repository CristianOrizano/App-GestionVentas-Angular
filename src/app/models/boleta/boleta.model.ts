import { Cliente } from "../cliente/cliente";
import { Usuario } from "../user/usuario";

export class Boleta {
    fechaEmision: string="";
  idcliente: number=0;
  idusuario: number=0;
  total: number=0;
  listaDetalleBol: DetalleBoleta[]=[];
}

export class DetalleBoleta {
    idProducto: number=0;
    cantidad: number=0;
  }

export class BoletaResponse {
  id: number=0;
  fechaEmision: string="";
  cliente: Cliente= new Cliente();
  usuario: Usuario= new Usuario();
  total: number=0;
  listaDetalleBol: DetalleBoleta[]=[];
}
