import { Authority } from "../authority/authority";
import { Rol } from "../rol/rol";

export class Usuario {

    id_usuario?: number;
    email?: string;
    nombre?: string;
    apellido?: string;
    enabled?: boolean;
    username?: string;
    password?: string;
    nimagen?: string;
    roles?: Rol[];
    authorities?: Authority[];
    accountNonExpired?: boolean;
    credentialsNonExpired?: boolean;
    accountNonLocked?: boolean;


}
