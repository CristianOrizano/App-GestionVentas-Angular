import { Component, OnInit } from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, debounceTime } from 'rxjs';
import { Boleta, DetalleBoleta } from 'src/app/models/boleta/boleta.model';
import { Cliente } from 'src/app/models/cliente/cliente';
import { CarritoSave, Producto } from 'src/app/models/producto/producto';
import { Usuario } from 'src/app/models/user/usuario';
import { SignInService } from 'src/app/services/Sign-in/sign-in.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { VentaService } from 'src/app/services/venta/venta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit{
  public page!:number;
  searchValue: string = '';
  filteredOptions: Producto[] = [];
  listaProducto: Producto[] = [];
  productoSave: Producto = new Producto();
  resultSelected: boolean = false;
  cantidadProductos: number=1;
  montoTotal : number=0;
  cantidadTotal : number=0;
  listClientes : Cliente[] = [];
  clienteSave : Cliente = new Cliente();
  usuarioActual : Usuario = new Usuario();
  clienteSeleccionado:boolean=true;
  //generar venta
  boletaSave : Boleta = new Boleta();
  detalleLista : DetalleBoleta[] = [];

  //lista carrito 
  carrito: CarritoSave[]=[];


  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private productoService: ProductoService,private storage: Storage,private venta: VentaService,
    private usuarioService: SignInService,private clienteService: ClienteService, private router:Router
    ,private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
 
    this.searchSubject.pipe(
      debounceTime(500)
    ).subscribe(() => {
      this.getListProductos();
    });
    this.getCarritoCompras();
    this.currentUsuario();
    this.getListCliente();
  }

  currentUsuario(){
    this.usuarioService.getCurrentUser().subscribe({
      next:(data) =>{
        this.usuarioActual= data;
      },error(e){
         console.log("ocurrio un error"+ e);
      }
    });
  }

  generarVenta(){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
   
    console.log("Carrito===>", this.carrito);
    this.boletaSave.idcliente = this.clienteSave.codigo;
    this.boletaSave.idusuario = this.usuarioActual.id_usuario;
    this.boletaSave.total = this.montoTotal;

    for(const item of this.carrito){
      const detalleBoleta = new DetalleBoleta()
      detalleBoleta.cantidad= item.cantidad;
      detalleBoleta.idProducto= item.codigoele;
      this.detalleLista.push(detalleBoleta);
    }

    this.boletaSave.listaDetalleBol= this.detalleLista;

    this.venta.generarVenta(this.boletaSave).subscribe({
      next:()=>{
        Swal.fire('Correcto', "Éxito al guardar", 'success');
       this.cancelarVenta();
       this.router.navigate(['/dashboard/listar-ventas']);  
      },error(error){
            console.log("error al generar venta",error);
      }
    }) 
  }, 3000);

  }

  cancelarVenta(){
    this.clienteSave = new Cliente();
    this.clienteSeleccionado=true;
    this.venta.limpiarCarro();
    this.detalleLista=[];
    this.getCarritoCompras();
    this.searchValue="";
    this.productoSave= new Producto();
    this.cantidadProductos=1;
  }


  agregarCliente(cliente: Cliente){
       this.clienteSave= cliente;
       this.clienteSeleccionado=false;
  }

  getListCliente() {
    this.clienteService.listEmpls().subscribe({
      next: (data) => {
        this.listClientes = data;
      }, error: (error) => {
        console.log("error en : " + error);
      }
    });
  }



  AgregarCarrito(){ //no olvidar debug
    const carritoSave = new CarritoSave();
    // Asignar valores al nuevo objeto
    carritoSave.codigoele = this.productoSave.codigoele;
    carritoSave.fireimagen = this.productoSave.fireimagen;
    carritoSave.descripcion = this.productoSave.descripcion;
    carritoSave.precio = this.productoSave.precio;
    carritoSave.cantidad = this.cantidadProductos;
    carritoSave.subTotal = this.cantidadProductos * this.productoSave.precio;

    this.venta.agregarAlCarrito(carritoSave);
     this.getCarritoCompras();
  }
  aumentarCantidad(producto: CarritoSave) {
    producto.cantidad++; 
    producto.subTotal = producto.cantidad * producto.precio; 
    this.venta.aumentarRestar(producto); // Actualiza el carrito en el localStorage
    this.getCarritoCompras();
  }

  disminuirCantidad(producto: CarritoSave) {
    if (producto.cantidad > 1) {
      producto.cantidad--; 
      producto.subTotal = producto.cantidad * producto.precio; 
      this.venta.aumentarRestar(producto);// Actualiza el carrito en el localStorage
    }
    this.getCarritoCompras();
  }

  getCarritoCompras(){
     this.carrito=this.venta.cargarCarrito(); 
     this.montoTotal=0;
     this.cantidadTotal=0;
     for( let item of this.carrito){
      this.montoTotal += item.subTotal;
      this.cantidadTotal += item.cantidad;
     }
  }

  eliminarCarrito(producto:CarritoSave){
    this.venta.eliminarDelCarrito(producto);
    this.getCarritoCompras();
  }

     
  getListProductos() {
    this.productoService.listarProductos().subscribe({
      next: (data) => {
        this.listaProducto = data;
        for (let item of this.listaProducto){  //bucle para asociar imagen a cada registro
          if(item.nimagen !=""){     //mientras haya contenido en el nombre asociar
           //Obtener la URL de descarga de la imagen por nombre
           const imagesRef = ref(this.storage, `productos/${item.nimagen}`);
            getDownloadURL(imagesRef).then((url) => {
            item.fireimagen=url;  //almacenar la URL en una variable
           })
          }else{
            console.log("no hay imagen en el Storage")
          }  
        }
      
        this.filterOptions();
      },
      error: (error) => {
        console.log("error en : " + error);
      }
    });
  }

  filterOptions() {
    if (this.searchValue === '') {
      this.filteredOptions = [];
      return;
    }
    this.filteredOptions = this.listaProducto.filter(option =>
      option.descripcion.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  
onSearchChange() {
  this.resultSelected = false;
  // Emitir el valor de búsqueda al sujeto
  this.searchSubject.next(this.searchValue);
}
selectOption(option: Producto) {
  this.searchValue = option.descripcion;
  this.filteredOptions = [];
  this.resultSelected = true; 
  this.productoSave= option;
}


}
