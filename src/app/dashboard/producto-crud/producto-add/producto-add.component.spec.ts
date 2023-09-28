import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoAddComponent } from './producto-add.component';

describe('ProductoAddComponent', () => {
  let component: ProductoAddComponent;
  let fixture: ComponentFixture<ProductoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
