import { Component, OnInit } from '@angular/core';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { Producto } from 'src/app/models/producto/producto';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-catalogo-list',
  templateUrl: './catalogo-list.component.html',
  styleUrls: ['./catalogo-list.component.css']
})
export class CatalogoListComponent implements OnInit {

  productos: Producto[] = [];
  constructor(private serProductos:ProductoService,private storage: Storage){}

  ngOnInit(): void {
    this.getListProductos();
  }

  getListProductos() {
    this.serProductos.listarProductos().subscribe({
      next: (data) => {
        this.productos = data;
        for (let item of this.productos) {  //bucle para asociar imagen a cada registro
          if (item.nimagen != "") {     //mientras haya contenido en el nombre asociar
            //Obtener la URL de descarga de la imagen por nombre
            const imagesRef = ref(this.storage, `productos/${item.nimagen}`);
            getDownloadURL(imagesRef).then((url) => {
              item.fireimagen = url;  //almacenar la URL en una variable
            })
          } else {
            console.log("no hay imagen en el Storage")
          }
        }
      }, error: (error) => {
        console.log("error en : " + error);
      }
    });
  }



}
