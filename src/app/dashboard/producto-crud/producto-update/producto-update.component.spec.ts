import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoUpdateComponent } from './producto-update.component';

describe('ProductoUpdateComponent', () => {
  let component: ProductoUpdateComponent;
  let fixture: ComponentFixture<ProductoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
