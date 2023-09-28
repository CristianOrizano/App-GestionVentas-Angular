import { Component, OnInit } from '@angular/core';
import { Storage, deleteObject, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria/categoria';
import { Estado } from 'src/app/models/estado/estado';
import { Producto } from 'src/app/models/producto/producto';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { CiudadService } from 'src/app/services/ciudad/ciudad.service';
import { ProductoService } from 'src/app/services/producto/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-crud',
  templateUrl: './producto-crud.component.html',
  styleUrls: ['./producto-crud.component.css']
})
export class ProductoCrudComponent implements OnInit {

  public page!:number;

    // Declaración del formulario reactivo
    formProducto: FormGroup;

  nameImageDelet:string="";
  listProducto: Producto[] = [];
  productoModel:Producto = new Producto();
  //var para la preview y para almacenar img y subir al server
  photoSelected: string | ArrayBuffer="";
  file: File = new File([],'default'); // Asignar un valor por defecto


  constructor(private serProducto:ProductoService,private router:Router,private storage: Storage,private form:FormBuilder){
    this.formProducto = this.form.group({
      'imagen': [""],
    });
  }

  ngOnInit(): void {
    this.getListProductos();
  }

   agregarProducto(){
    this.router.navigate(['/dashboard/producto-add']);
  }
  enviarObjeto(data:Producto){
    this.router.navigate(['/dashboard/producto-update/'+data.codigoele]);
  }

  UpdateImage(){
    if(this.nameImageDelet!=""){
        this.uploadPhoto();
        this.DeleteImage();
        this.updateProducto();
    }else{
      this.uploadPhoto();
      this.updateProducto();
    }
  }

  updateProducto(){
    this.productoModel.nimagen=this.file.name;//save name img in model
    this.serProducto.Update(this.productoModel).subscribe({
      next: (data:any) => {
        Swal.fire('Mensaje','Exito al Actualizar','success');
      },
      error: (error) => {
        console.log("estos==> "+this.productoModel.descripcion);
        console.error(error);
        Swal.fire('Error', 'Hubo un problema al registrar el usuario', 'error');
      }
   });
  }

  DeleteProducto(data:Producto){
    Swal.fire({
      title: '¿Desea eliminar?',
      text: "Los cambios no se van a revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina.',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
        if (result.isConfirmed) { 
          if(data.nimagen !=""){
            const imagesRef = ref(this.storage, `productos/${data.nimagen}`);
            deleteObject(imagesRef)
              .then(() => {
                console.log("Imagen eliminada con éxito del storage");
              })
          }
          this.serProducto.delete(data.codigoele).subscribe(
            (x)=>{       
               Swal.fire('Eliminado Correcto',"Exito al Eliminar",'success') 
               this.getListProductos();             
            }      
          );
          
        }
    })
  }
  


  //traer img por el btn-img para cambiar
getImage(data:Producto){ 
  this.formProducto.reset(); //limpia el file
    this.productoModel=data;  //asigna al modelo
  if(this.productoModel.nimagen !=""){//mostrale la imagen si hay contenido
    this.nameImageDelet=data.nimagen;//si cambia guardo el name antiguo
    const imagesRef = ref(this.storage,  `productos/${data.nimagen}`);
    // Obtener la URL de descarga de la imagen
    getDownloadURL(imagesRef).then((url) => {
    this.photoSelected=url;
   })
  }else{
    this.photoSelected=""
  }
}

  //pre-View-Image
  onPhotoSelected(event: any): void {
    //asegurarse de que eligio un archivo
    if (event.target.files && event.target.files.length > 0) {
      this.file = <File>event.target.files[0];
      console.log(event);
      console.log(this.file);
      //para leer contenido
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result!;
      reader.readAsDataURL(this.file);
      
    } else {
      //no almacena nada la var pre-view
      this.photoSelected = ""
      console.log("esta vacio");
    }
  }
 
  getListProductos() {
    this.serProducto.listarProductos().subscribe({
      next: (data) => {
        this.listProducto = data;
        for (let item of this.listProducto){  //bucle para asociar imagen a cada registro
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
      }, error: (error) => {
        console.log("error en : " + error);
      }
    });
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

   //eliminar img por su nombre
DeleteImage(){
  const imagesRef = ref(this.storage, `productos/${this.nameImageDelet}`);
  deleteObject(imagesRef)
    .then(() => {
      console.log("Imagen eliminada con éxito");
    })
    .catch((error) => {
      console.error("Error al eliminar la imagen:", error);
    });
 }





}
