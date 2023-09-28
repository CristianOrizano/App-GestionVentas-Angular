import { Categoria } from "../categoria/categoria";
import { Estado } from "../estado/estado";

export class Producto {

    codigoele:number=0;
	cate:Categoria= new Categoria();
	descripcion:string="";
	stock:number=0;
	precio:number=0;
	marca:string="";
    nimagen:string="";
    fireimagen:string="";
    estado:Estado= new Estado;

}
