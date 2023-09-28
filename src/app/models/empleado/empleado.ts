import { Ciudad } from "../ciudad/ciudad";
import { Estado } from "../estado/estado";

export class Empleado {
    codigo: number=0;
    nombre?: string="";
    apellido: string="";
    direccion: string="";
    telefono: number=0;
    sueldo: number=0;
    fechanaci: string="";
    estad: Estado= new Estado();
    ciudad: Ciudad=new Ciudad();
}
