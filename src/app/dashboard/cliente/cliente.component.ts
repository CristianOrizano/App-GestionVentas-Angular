import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements  OnInit{

  public page!:number;

  clienteSave: Cliente = new Cliente();
  // Declaración del formulario reactivo
  formCliente: FormGroup;

  //atributes
  confirmado: boolean = false;
  idCliente:number=0 ;
  listClientes: Cliente[] = [];

  constructor(private clienteService: ClienteService,private form: FormBuilder) {
    //formulario reactivo
    this.formCliente = this.form.group({
      'nombre': ["", [Validators.required, Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{3,30}')]],
      'apellido': ["", [Validators.required, Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{3,30}')]],
      'direccion': ["", [Validators.required, Validators.maxLength(50)]],
      'ndocumento': ["", [Validators.required, Validators.pattern(/^\d{8}$/)]],
      'telefono': ["", [Validators.required, Validators.pattern(/^\d{9}$/)]]
    }); 
}


  ngOnInit(): void {
    this.getListCliente();
  }

  private assignFormValuesToCliente() {
    // this.empleadoSav = this.formEmpleado.value;
    const formulario = this.formCliente;
     this.clienteSave.nombre = formulario.get('nombre')?.value;
     this.clienteSave.apellido = formulario.get('apellido')?.value;
     this.clienteSave.direccion = formulario.get('direccion')?.value;
     this.clienteSave.ndocumento = formulario.get('ndocumento')?.value;
     this.clienteSave.telefono = formulario.get('telefono')?.value;
   }
   //llenar el formulario
     Buscar(data:Cliente){
       //this.formEmpleado.patchValue(data);
        this.idCliente=data.codigo;
        this.formCliente.get('nombre')?.setValue(data.nombre);
        this.formCliente.get('apellido')?.setValue(data.apellido);
        this.formCliente.get('direccion')?.setValue(data.direccion);
        this.formCliente.get('ndocumento')?.setValue(data.ndocumento);
        this.formCliente.get('telefono')?.setValue(data.telefono);
  
     }


  save() {
    if (this.formCliente.invalid) {
      return this.formCliente.markAllAsTouched();
    }
    this.assignFormValuesToCliente();
    if(this.idCliente == 0){
      //register   
      this.clienteService.register(this.clienteSave).subscribe({
        next: (data) => {
          Swal.fire('Correcto', "Éxito al guardar", 'success');
          this.getListCliente();

        }, error: (error) => {
          Swal.fire('Error', "Error al guardar", 'success');
          console.log("error en : " + error);
        }
        });
    }else{
      this.clienteService.Update(this.clienteSave,this.idCliente).subscribe({
        next: (data) => {
          Swal.fire('Correcto', "Éxito al actualizar", 'success');
          this.getListCliente();
         
        }, error: (error) => {
          Swal.fire('Error', "Error al actualizar", 'success');
          console.log("error en : " + error);
        }
        });
    }
  }


  toggleEstado(event:any,data:Cliente) {
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
          this.clienteService.delete(data.codigo).subscribe(
            (x)=>{        
               Swal.fire(`Correcto` ,`Exito al ${info}` ,'success') 
               this.getListCliente();             
            }      
          ); 
        }
    })

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


  cleanForm() {
    // Utiliza el método reset() para restablecer campos individuales
    this.formCliente.reset();
    this.idCliente= 0;

  }



}
