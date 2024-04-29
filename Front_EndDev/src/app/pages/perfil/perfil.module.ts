import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { ProgresoComponent } from './pages/progreso/progreso.component';
import { SeguridadComponent } from './pages/seguridad/seguridad.component';
import { InfoGeneralComponent } from './pages/info-general/info-general.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CompCompartidosModule } from 'src/app/comp-compartidos/comp-compartidos.module';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    PerfilComponent,
    ProgresoComponent,
    SeguridadComponent,
    InfoGeneralComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CompCompartidosModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatIconModule
  ]
})

export class PerfilModule {
  
 }
