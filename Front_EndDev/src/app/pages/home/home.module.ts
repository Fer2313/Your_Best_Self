import { CompCompartidosModule } from './../../comp-compartidos/comp-compartidos.module';
import { AppRoutingModule } from './../../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HPComponent } from './hp/hp.component';
import { CompEntrenamientosComponent } from './pages/comp-entrenamientos/comp-entrenamientos.component';
import { PersEntrenamientosComponent } from './pages/pers-entrenamientos/pers-entrenamientos.component';
import { LibrayEjecicesComponent } from './pages/libray-ejecices/libray-ejecices.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EntrenamientosComponent } from './pages/entrenamientos/entrenamientos.component';


@NgModule({
  declarations: [
    HPComponent,
    HomeComponent,
    HPComponent,
    CompEntrenamientosComponent,
    PersEntrenamientosComponent,
    LibrayEjecicesComponent,
    EntrenamientosComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    CompCompartidosModule,
    MatProgressSpinnerModule
  ]
})
export class HomeModule { }
