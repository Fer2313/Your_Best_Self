import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { NavBar2Component } from './components/nav-bar2/nav-bar2.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './components/modal/modal.component';
import { CardComponent } from './components/card/card.component';



@NgModule({
  declarations: [
  NavBarComponent,
  FooterComponent,
  NavBar2Component,
  ModalComponent,
  CardComponent,
],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  exports:[
    NavBarComponent,
    FooterComponent,
    NavBar2Component,
    ModalComponent,
    CardComponent,
  ],

})
export class CompCompartidosModule { }
