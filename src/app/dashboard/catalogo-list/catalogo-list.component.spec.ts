import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoListComponent } from './catalogo-list.component';

describe('CatalogoListComponent', () => {
  let component: CatalogoListComponent;
  let fixture: ComponentFixture<CatalogoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
