import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiderbarComponent } from './siderbar.component';

describe('SiderbarComponent', () => {
  let component: SiderbarComponent;
  let fixture: ComponentFixture<SiderbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiderbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiderbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
