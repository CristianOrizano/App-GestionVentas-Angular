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
  listEmpleado: Empleado[] = [];
  listEstado: Estado[] = [];
  listCiudad: Ciudad[] = [];

  constructor(private empleServ: EmpleadoService, private estCiuServ: CiudadService, private form: FormBuilder, private router: Router) {
      //formulario reactivo
      this.formEmpleado = this.form.group({
        'codigo': ["0"],
        'nombre': ["fdg", [Validators.required, Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{5,30}')]],
        'apellido': ["", [Validators.required, Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{5,30}')]],
        'direccion': ["", [Validators.required, Validators.maxLength(50)]],
        'telefono': ["", [Validators.required, Validators.pattern(/^\d{9}$/)]],
        // 'sueldo': ["",[Validators.required,Validators.pattern('([5-9]\\d{2})|(1\\d{3})|(2000)')]],
        'sueldo': ["", [Validators.required, Validators.min(1000), Validators.max(8000), Validators.pattern(/^\d+\.\d{1,2}?$/)]], // Máximo valor]],
        'fnacimiento': ["", [Validators.required]],
        'estado': ["", [Validators.required]],
        'ciudad': ["", [Validators.required]]
    
      });
      
  }


  ngOnInit(): void {
   
    this.getListEmpleado();
    this.getListCiudads();
    this.getListEstados();
   
  }
  
private assignFormValuesToEmpleado() {
  const formulario = this.formEmpleado;
  this.empleadoSav.codigo = formulario.get('codigo')?.value;
  this.empleadoSav.nombre = formulario.get('nombre')?.value;
  this.empleadoSav.apellido = formulario.get('apellido')?.value;
  this.empleadoSav.direccion = formulario.get('direccion')?.value;
  this.empleadoSav.telefono = formulario.get('telefono')?.value;
  this.empleadoSav.sueldo = formulario.get('sueldo')?.value;
  this.empleadoSav.fechanaci = formulario.get('fnacimiento')?.value;
  this.empleadoSav.estad.codestad = formulario.get('estado')?.value;
  this.empleadoSav.ciudad.codigo = formulario.get('ciudad')?.value;
}
//llenar el formulario
  Buscar(data:Empleado){
    this.formEmpleado.get('codigo')?.setValue(data.codigo);
     this.formEmpleado.get('nombre')?.setValue(data.nombre);
     this.formEmpleado.get('apellido')?.setValue(data.apellido);
     this.formEmpleado.get('direccion')?.setValue(data.direccion);
     this.formEmpleado.get('telefono')?.setValue(data.telefono);
     this.formEmpleado.get('sueldo')?.setValue(data.sueldo);
     this.formEmpleado.get('fnacimiento')?.setValue(data.fechanaci);
     this.formEmpleado.get('estado')?.setValue(data.estad.codestad);
     this.formEmpleado.get('ciudad')?.setValue(data.ciudad.codigo);

  }

  saveEmpleado() {
    // Asignar valores del formulario reactivo al modelo
    this.assignFormValuesToEmpleado()

    this.empleServ.register(this.empleadoSav).subscribe({
      next: (data) => {
        Swal.fire('Registro Correcto', "Exito al registrar", 'success')
        this.router.navigate(['/dashboard/empleado']);
        this.getListEmpleado();

      }, error: (error) => {
        console.log("error en : " + error);
      }
    });
  }
  
  UpdateEmpleado(){
    // Asignar valores del formulario reactivo al modelo
    this.assignFormValuesToEmpleado()
    this.empleServ.Update(this.empleadoSav).subscribe({
      next: (data) => {
        Swal.fire('Update Correcto', "Exito al registrar", 'success')
        this.router.navigate(['/dashboard/empleado']);
        this.getListEmpleado();

      }, error: (error) => {
        console.log("error en : " + error);
      }
    });
 }
  DeleteEmpleado(data:Empleado){
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
          this.empleServ.delete(data.codigo).subscribe(
            (x)=>{      
              console.log("codi: "+data.codigo)   
               Swal.fire('Eliminado Correcto',"Exito al Eliminar",'success') 
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

  getListEstados() {
    this.estCiuServ.listEstado().subscribe({
      next: (data) => {
        this.listEstado = data;
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
    this.formEmpleado.get('estado')?.setValue("");
    this.formEmpleado.get('ciudad')?.setValue("");
  }


}
