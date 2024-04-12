import { Rol } from "../rol/rol";

export class Usuariosave {
    id_usuario: number=0;
    email: string="";
    nombre: string="";
    apellido: string="";
    enabled: boolean=true;
    username: string="";
    password: string="";
    nimagen: string="";
    roles: Rol[]=[];
    //imagen
    fireimagen:string="";
}
