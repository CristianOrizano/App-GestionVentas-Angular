import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SiderbarComponent } from './siderbar/siderbar.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SiderbarComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SiderbarComponent
  ]
})
export class SharedModule { }
