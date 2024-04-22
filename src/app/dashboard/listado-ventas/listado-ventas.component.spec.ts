import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoVentasComponent } from './listado-ventas.component';

describe('ListadoVentasComponent', () => {
  let component: ListadoVentasComponent;
  let fixture: ComponentFixture<ListadoVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoVentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
