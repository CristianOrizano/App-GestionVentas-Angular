import { Component } from '@angular/core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {

  options: string[] = ['Manzana', 'Banana', 'Cereza', 'Damasco', 'Fresa'];
  searchValue: string = '';
  filteredOptions: string[] = [];

  filterOptions() {
    if (this.searchValue === '') {
      this.filteredOptions = [];
      return;
    }
    this.filteredOptions = this.options.filter(optiond =>
      optiond.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

}
