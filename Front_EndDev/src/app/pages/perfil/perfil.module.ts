import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { ProgresoComponent } from './pages/progreso/progreso.component';
import { SeguridadComponent } from './pages/seguridad/seguridad.component';
import { InfoGeneralComponent } from './pages/info-general/info-general.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CompCompartidosModule } from 'src/app/comp-compartidos/comp-compartidos.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';





@NgModule({
  declarations: [
    PerfilComponent,
    ProgresoComponent,
    SeguridadComponent,
    InfoGeneralComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CompCompartidosModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
  ]
})

export class PerfilModule {
  
 }
