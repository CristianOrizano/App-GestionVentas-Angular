import { Authority } from "../authority/authority";
import { Rol } from "../rol/rol";

export class Usuario {
    
    id_usuario: number=0;
    email: string="";
    nombre: string="";
    apellido: string="";
    enabled: boolean=true;
    username: string="";
    password: string="";
    nimagen: string="";
    roles: Rol[]=[];
    authorities: Authority[]=[];
    accountNonExpired: boolean=true;
    credentialsNonExpired: boolean=true;
    accountNonLocked: boolean=true
    //imagen
    fireimagen:string="";
}
