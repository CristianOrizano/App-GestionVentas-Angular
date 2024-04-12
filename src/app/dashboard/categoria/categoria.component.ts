import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria/categoria';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements  OnInit {

  public page!:number;

  categoriaSave: Categoria = new Categoria();
  // Declaración del formulario reactivo
  formCategoria: FormGroup;

  //atributes
  confirmado: boolean = false;
  idCategoria:number=0 ;
  listCategorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService,private form: FormBuilder) {
    this.formCategoria = this.form.group({
      'nombre': ["fdg", [Validators.required, Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{5,30}')]],
      'descripcion': ["", [Validators.required, Validators.pattern('[\\wáéíóúüñÁÉÍÓÚÜÑ\\s]{5,70}')]]
    }); 
  }

  ngOnInit(): void {
   this.getListCategorias();
  }

  private assignFormValuesToCategoria() {
    // this.empleadoSav = this.formEmpleado.value;
    const formulario = this.formCategoria;
     this.categoriaSave.nombre = formulario.get('nombre')?.value;
     this.categoriaSave.descripcion = formulario.get('descripcion')?.value;
   }
   Buscar(data:Categoria){
    //this.formEmpleado.patchValue(data);
     this.idCategoria=data.codigocate;
     this.formCategoria.get('nombre')?.setValue(data.nombre);
     this.formCategoria.get('descripcion')?.setValue(data.descripcion);
  }

  save() {
    if (this.formCategoria.invalid) {
      return this.formCategoria.markAllAsTouched();
    }
    this.assignFormValuesToCategoria();
    if(this.idCategoria == 0){
      //register   
      this.categoriaService.register(this.categoriaSave).subscribe({
        next: (data) => {
          Swal.fire('Correcto', "Éxito al guardar", 'success');
          this.getListCategorias();

        }, error: (error) => {
          Swal.fire('Error', "Error al guardar", 'success');
          console.log("error en : " + error);
        }
        });
    }else{
      this.categoriaService.Update(this.categoriaSave,this.idCategoria).subscribe({
        next: (data) => {
          Swal.fire('Correcto', "Éxito al actualizar", 'success');
          this.getListCategorias();
         
        }, error: (error) => {
          Swal.fire('Error', "Error al actualizar", 'success');
          console.log("error en : " + error);
        }
        });
    }
  }



  toggleEstado(event:any,data:Categoria) {
    event.preventDefault();
    console.log("fff", event);
    let info: string = data.state ? "Desactivar" : "Activar";
    Swal.fire({
      title: `¿Desea ${info}? `,
      text: "Los cambios se veran automaticamente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí.',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
        if (result.isConfirmed) { 
          this.categoriaService.delete(data.codigocate).subscribe(
            (x)=>{        
               Swal.fire(`Correcto` ,`Exito al ${info}` ,'success') 
               this.getListCategorias();             
            }      
          ); 
        }
    })

   }

  getListCategorias() {
    this.categoriaService.listarCategorias().subscribe({
      next: (data) => {
        this.listCategorias = data;
      }, error: (error) => {
        console.log("error en : " + error);
      }
    });
  }
  cleanForm() {
    // Utiliza el método reset() para restablecer campos individuales
    this.formCategoria.reset();
    this.idCategoria= 0;
  
  }






}
