import { Component, OnInit } from '@angular/core';
import { Storage, deleteObject, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria/categoria';
import { Estado } from 'src/app/models/estado/estado';
import { Producto } from 'src/app/models/producto/producto';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { CiudadService } from 'src/app/services/ciudad/ciudad.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-update',
  templateUrl: './producto-update.component.html',
  styleUrls: ['./producto-update.component.css']
})
export class ProductoUpdateComponent implements OnInit {
  
  idproducto: number=0;
  productoModel:Producto=new Producto();
  //var para la preview
  photoSelected: string | ArrayBuffer="";
  //var para almacenar img y subir al server
  file: File = new File([], ''); // Asignar un valor por defecto

  // Declaración del formulario reactivo
  formProducto: FormGroup;

  listEstado: Estado[] = [];
  listCategoria: Categoria[] = [];

  constructor(private route:ActivatedRoute,private serBuscarProducto: ProductoService,private form:FormBuilder,
    private router: Router,private serEstado: CiudadService,private serCategoria:CategoriaService,private storage: Storage,
    private serProducto:ProductoService) {
    this.route.params.subscribe(params =>{
      this.idproducto = params['idProd']  
    });

    this.formProducto = this.form.group({
      'codigo': [""],
      'imagen': [""],
      'descripcion': ["", [Validators.required,Validators.minLength(3),Validators.maxLength(60)]],
      'categoria': ["", [Validators.required]],
      'stock': ["", [Validators.required,Validators.pattern(/^(10|([1-4][0-9]|50))$/)]],
      'precio': ["", [Validators.required, Validators.pattern(/^([1-7][0-9]{3}|8000)$/)]],
      'marca': ["", [Validators.required,Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{3,30}')]], 
      'estado': ["", [Validators.required]],
     
    });
  }
  ngOnInit(): void { 
    this.BuscarProducto();
    this.getListCategorias();
    this.getListEstados();
    
  }
  
  UpdateEmpleado() {
    // Asignar valores del formulario reactivo al modelo
    this.assignFormValuesToProducto()
    this.serProducto.Update(this.productoModel).subscribe({
      next: (data) => {
        Swal.fire('Correcto', "Exito al Actualizar", 'success')
      }, error: (error) => {
        console.log(error);
      }
    });
  }

  assignFormValuesToProducto() {
    const formulario = this.formProducto;
    this.productoModel.codigoele = formulario.get('codigo')?.value;
    this.productoModel.descripcion = formulario.get('descripcion')?.value;
    this.productoModel.marca = formulario.get('marca')?.value;
    this.productoModel.stock = formulario.get('stock')?.value;
    this.productoModel.precio = formulario.get('precio')?.value;
    this.productoModel.estado.codestad = formulario.get('estado')?.value;
    this.productoModel.cate.codigocate = formulario.get('categoria')?.value;
    this.productoModel.nimagen = formulario.get('imagen')?.value;
  }


  BuscarProducto() {
    this.serBuscarProducto.FindByIDProducto(this.idproducto).subscribe((data) => {
      this.productoModel = data;
      this.getImage();
      this.assignProductoValuesToForm();
    });
  }
  VolverListado(){
    this.router.navigate(['/dashboard/producto-list']);
   }

 

  getImage(){
    if(this.productoModel.nimagen !=""){//mostrale la imagen si hay contenido
      const imagesRef = ref(this.storage, `productos/${this.productoModel.nimagen}`);
      // Obtener la URL de descarga de la imagen
      getDownloadURL(imagesRef).then((url) => {
      this.photoSelected=url;
     })
    }else{
      this.photoSelected=""
    }
  }

  assignProductoValuesToForm(){
    this.formProducto.get('codigo')?.setValue(this.productoModel.codigoele);
    this.formProducto.get('descripcion')?.setValue(this.productoModel.descripcion);
    this.formProducto.get('categoria')?.setValue(this.productoModel.cate.codigocate);
    this.formProducto.get('stock')?.setValue(this.productoModel.stock);
    this.formProducto.get('precio')?.setValue(this.productoModel.precio);
    this.formProducto.get('marca')?.setValue(this.productoModel.marca);
    this.formProducto.get('estado')?.setValue(this.productoModel.estado.codestad);
    this.formProducto.get('imagen')?.setValue(this.productoModel.nimagen);
    
  }

  onPhotoSelected(event: any): void {
    //asegurarse de que eligio un archivo
    if (event.target.files && event.target.files.length>0) {
      this.file = <File>event.target.files[0];
      console.log(event);
      console.log(this.file);
      //para leer contenido
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result!;
      reader.readAsDataURL(this.file);
    
    }else{
      //no almacena nada la var pre-view
      this.photoSelected=""
      this.file=new File([], '');
      console.log("esta vacio");
    }
  }


  getListEstados() {
    this.serEstado.listEstado().subscribe({
      next: (data) => {
        this.listEstado = data;
      }, error: (error) => {
        console.log("error en : " + error);
      }
    });
  }

  getListCategorias() {
    this.serCategoria.listarCategorias().subscribe({
      next: (data) => {
        this.listCategoria = data;
      }, error: (error) => {
        console.log("error en : " + error);
      }
    });
  }




}
