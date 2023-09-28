import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMainAdminComponent } from './page-main-admin.component';

describe('PageMainAdminComponent', () => {
  let component: PageMainAdminComponent;
  let fixture: ComponentFixture<PageMainAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMainAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageMainAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
