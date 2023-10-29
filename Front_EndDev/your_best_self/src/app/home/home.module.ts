import { CompCompartidosModule } from './../comp-compartidos/comp-compartidos.module';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HPComponent } from './hp/hp.component';
import { CompEntrenamientosComponent } from './pages/comp-entrenamientos/comp-entrenamientos.component';
import { PersEntrenamientosComponent } from './pages/pers-entrenamientos/pers-entrenamientos.component';



@NgModule({
  declarations: [
    HPComponent,
    HomeComponent,
    HPComponent,
    CompEntrenamientosComponent,
    PersEntrenamientosComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    CompCompartidosModule
  ]
})
export class HomeModule { }
