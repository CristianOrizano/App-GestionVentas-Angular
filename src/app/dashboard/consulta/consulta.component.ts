import { Component, OnInit } from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { Producto } from 'src/app/models/producto/producto';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit{

  // options: string[] = ['Manzana', 'Banana', 'Cereza', 'Damasco', 'Fresa'];
  searchValue: string = '';
  filteredOptions: Producto[] = [];
  listaProducto: Producto[] = [];
  resultSelected: boolean = false;
  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private productoService: ProductoService,private storage: Storage) {

  }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(500)
    ).subscribe(() => {
      this.getListProductos();
    });
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
}

}
