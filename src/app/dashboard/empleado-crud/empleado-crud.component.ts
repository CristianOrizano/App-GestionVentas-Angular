import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ciudad } from 'src/app/models/ciudad/ciudad';
import { Empleado } from 'src/app/models/empleado/empleado';
import { Estado } from 'src/app/models/estado/estado';
import { CiudadService } from 'src/app/services/ciudad/ciudad.service';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado-crud',
  templateUrl: './empleado-crud.component.html',
  styleUrls: ['./empleado-crud.component.css']
})
export class EmpleadoCrudComponent implements  OnInit {

  public page!:number;

  empleadoSav: Empleado = new Empleado();
  // Declaración del formulario reactivo
  formEmpleado: FormGroup;

  //atributes
  confirmado: boolean = false;
  idEmpleado:number=0 ;
  listEmpleado: Empleado[] = [];
  listCiudad: Ciudad[] = [];

  constructor(private empleServ: EmpleadoService, private estCiuServ: CiudadService, private form: FormBuilder, private router: Router) {
      //formulario reactivo
      this.formEmpleado = this.form.group({
        'nombre': ["fdg", [Validators.required, Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{5,30}')]],
        'apellido': ["", [Validators.required, Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{5,30}')]],
        'direccion': ["", [Validators.required, Validators.maxLength(50)]],
        'telefono': ["", [Validators.required, Validators.pattern(/^\d{9}$/)]],
        // 'sueldo': ["",[Validators.required,Validators.pattern('([5-9]\\d{2})|(1\\d{3})|(2000)')]],
        'sueldo': ["", [Validators.required, Validators.min(1000), Validators.max(8000), Validators.pattern(/^\d+\.\d{1,2}?$/)]], // Máximo valor]],
        'fechanaci': ["", [Validators.required]],
        'ciudad': ["", [Validators.required]]
      }); 
  }

  ngOnInit(): void {
    this.getListEmpleado();
    this.getListCiudads();
   
  }
  
private assignFormValuesToEmpleado() {
 // this.empleadoSav = this.formEmpleado.value;
 const formulario = this.formEmpleado;
  this.empleadoSav.nombre = formulario.get('nombre')?.value;
  this.empleadoSav.apellido = formulario.get('apellido')?.value;
  this.empleadoSav.direccion = formulario.get('direccion')?.value;
  this.empleadoSav.telefono = formulario.get('telefono')?.value;
  this.empleadoSav.sueldo = formulario.get('sueldo')?.value;
  this.empleadoSav.fechanaci = formulario.get('fechanaci')?.value;
  this.empleadoSav.idCiudad = formulario.get('ciudad')?.value; 
}
//llenar el formulario
  Buscar(data:Empleado){
    //this.formEmpleado.patchValue(data);
     this.idEmpleado=data.codigo;
     this.formEmpleado.get('nombre')?.setValue(data.nombre);
     this.formEmpleado.get('apellido')?.setValue(data.apellido);
     this.formEmpleado.get('direccion')?.setValue(data.direccion);
     this.formEmpleado.get('telefono')?.setValue(data.telefono);
     this.formEmpleado.get('sueldo')?.setValue(data.sueldo);
     this.formEmpleado.get('fechanaci')?.setValue(data.fechanaci);
     this.formEmpleado.get('ciudad')?.setValue(data.ciudad.codigo);
  }

  save() {
    if (this.formEmpleado.invalid) {
      return this.formEmpleado.markAllAsTouched();
    }
    this.assignFormValuesToEmpleado();
    if(this.idEmpleado == 0){
      //register   
      this.empleServ.register(this.empleadoSav).subscribe({
        next: (data) => {
          Swal.fire('Correcto', "Éxito al guardar", 'success');
          this.getListEmpleado();

        }, error: (error) => {
          Swal.fire('Error', "Error al guardar", 'success');
          console.log("error en : " + error);
        }
        });
    }else{
      this.empleServ.Update(this.empleadoSav,this.idEmpleado).subscribe({
        next: (data) => {
          Swal.fire('Correcto', "Éxito al actualizar", 'success');
          this.getListEmpleado();
         
        }, error: (error) => {
          Swal.fire('Error', "Error al actualizar", 'success');
          console.log("error en : " + error);
        }
        });
    }
  }
  
  toggleEstado(event:any,data:Empleado) {
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
          this.empleServ.delete(data.codigo).subscribe(
            (x)=>{        
               Swal.fire(`Correcto` ,`Exito al ${info}` ,'success') 
               this.getListEmpleado();             
            }      
          ); 
        }
    })

   }

  getListEmpleado() {
    this.empleServ.listEmpls().subscribe({
      next: (data) => {
        this.listEmpleado = data;
      }, error: (error) => {
        console.log("error en : " + error);
      }
    });
  }

  getListCiudads() {
    this.estCiuServ.listCiudad().subscribe({
      next: (data) => {
        this.listCiudad = data;
      }, error: (error) => {
        console.log("error en : " + error);
      }
    });
  }
  cleanForm() {
    // Utiliza el método reset() para restablecer campos individuales
    this.formEmpleado.reset();
    this.idEmpleado= 0;
    this.formEmpleado.get('ciudad')?.setValue("");
  }


}
