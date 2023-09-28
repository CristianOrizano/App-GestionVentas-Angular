import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoCrudComponent } from './empleado-crud.component';

describe('EmpleadoCrudComponent', () => {
  let component: EmpleadoCrudComponent;
  let fixture: ComponentFixture<EmpleadoCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
