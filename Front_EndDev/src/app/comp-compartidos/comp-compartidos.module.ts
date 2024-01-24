import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { NavBar2Component } from './components/nav-bar2/nav-bar2.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './components/modal/modal.component';
import { CardComponent } from './components/card/card.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ModalFiltersEComponent } from './components/modal-filters-e/modal-filters-e.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  NavBarComponent,
  FooterComponent,
  NavBar2Component,
  ModalComponent,
  CardComponent,
  PaginationComponent,
  ModalFiltersEComponent,
],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  exports:[
    NavBarComponent,
    FooterComponent,
    NavBar2Component,
    ModalComponent,
    CardComponent,
    PaginationComponent,
    ModalFiltersEComponent
  ],

})
export class CompCompartidosModule { }
