import { Component,OnInit } from '@angular/core';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
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
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrls: ['./producto-add.component.css']
})
export class ProductoAddComponent implements OnInit {
  //var para la preview
  photoSelected: string | ArrayBuffer="";
  //var para almacenar img y subir al server
  file: File = new File([], ''); // Asignar un valor por defecto
  
  productoModel:Producto=new Producto();
  listEstado: Estado[] = [];
  listCategoria: Categoria[] = [];
     // Declaración del formulario reactivo
     formProducto: FormGroup;

  constructor(private serEstado: CiudadService,private serCategoria:CategoriaService,private form:FormBuilder,
    private storage: Storage,private serProducto:ProductoService,private router:Router){

    this.formProducto = this.form.group({
      'codigo': ["0"],
      'imagen': [""],
      'descripcion': ["", [Validators.required,Validators.minLength(3),Validators.maxLength(40)]],
      'categoria': ["", [Validators.required]],
      'stock': ["", [Validators.required,Validators.pattern(/^(10|([1-4][0-9]|50))$/)]],
      'precio': ["", [Validators.required, Validators.pattern(/^([1-7][0-9]{3}|8000)$/)]],
      'marca': ["", [Validators.required,Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{3,30}')]], 
      'estado': ["", [Validators.required]],
     
    });
  }
  ngOnInit(): void {
    this.getListCategorias();
    this.getListEstados();
  }

   assignFormValuesToProducto() {
    const formulario = this.formProducto;
    this.productoModel.descripcion = formulario.get('descripcion')?.value;
    this.productoModel.marca = formulario.get('marca')?.value;
    this.productoModel.stock = formulario.get('stock')?.value;
    this.productoModel.precio = formulario.get('precio')?.value;
    this.productoModel.estado.codestad = formulario.get('estado')?.value;
    this.productoModel.cate.codigocate = formulario.get('categoria')?.value;
  }

  cleanForm(){
    this.formProducto.reset();
    this.formProducto.get('categoria')?.setValue("");
    this.formProducto.get('estado')?.setValue("");
    this.photoSelected="";
    this.file=new File([], '');
     console.log("==>" +this.file.name);
  }
   

  saveEmpleado() {
    // Asignar valores del formulario reactivo al modelo
    this.assignFormValuesToProducto()
    this.uploadPhoto();
    this.productoModel.nimagen=this.file.name;
    this.serProducto.register(this.productoModel).subscribe({
      next: (data) => {
        Swal.fire('Registro Correcto', "Exito al registrar", 'success')
        this.cleanForm();
      }, error: (error) => {
        console.log(error);
      }
    });
  }
   VolverListado(){
    this.router.navigate(['/dashboard/producto-list']);
   }

   //pre-View-Image
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

  //upload photo to server
  uploadPhoto() {
    if( this.photoSelected !=""){
      console.log("imagen al servidor")
      const imgRef = ref(this.storage, `productos/${this.file.name}`);
      uploadBytes(imgRef,this.file)
      .then(response => {
        console.log(response)
      
      })
      .catch(error => console.log(error));
    }else{
      console.log("imagen vacio no subo nada al servidor")
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
