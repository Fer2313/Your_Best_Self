import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { PaginationFDComponent } from './components/pagination-fd/pagination-fd.component';
import { PContentComponent } from './components/pcontent/pcontent.component';
import { MatIconModule } from '@angular/material/icon';
import { DificultyRComponent } from './components/dificulty-r/dificulty-r.component';
import { ModalCronometroComponent } from './components/modal-cronometro/modal-cronometro.component';
import { AlertComponent } from './components/alert/alert.component';
import { InicioEntrenamientoComponent } from './components/inicio-entrenamiento/inicio-entrenamiento.component';
import { ProfileNavComponent } from './components/profile-nav/profile-nav.component';
import { ModalVerifyComponent } from './components/modal-verify/modal-verify.component';
import { ModalUpdatePasswordComponent } from './components/modal-update-password/modal-update-password.component';
import { TrainingsinweekComponent } from './components/trainingsinweek/trainingsinweek.component';
import { CalendarioActividadesComponent } from './components/calendario-actividades/calendario-actividades.component';





@NgModule({
  declarations: [
  NavBarComponent,
  FooterComponent,
  NavBar2Component,
  ModalComponent,
  CardComponent,
  PaginationComponent,
  ModalFiltersEComponent,
  PaginationFDComponent,
  PContentComponent,
  DificultyRComponent,
  ModalCronometroComponent,
  AlertComponent,
  InicioEntrenamientoComponent,
  ProfileNavComponent,
  ModalVerifyComponent,
  ModalUpdatePasswordComponent,
  TrainingsinweekComponent,
  CalendarioActividadesComponent,
],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule 
  ],
  exports:[
    NavBarComponent,
    FooterComponent,
    NavBar2Component,
    ModalComponent,
    CardComponent,
    PaginationComponent,
    ModalFiltersEComponent,
    PaginationFDComponent,
    PContentComponent,
    DificultyRComponent,
    ModalCronometroComponent,
    AlertComponent,
    InicioEntrenamientoComponent,
    ProfileNavComponent,
    ModalVerifyComponent,
    ModalUpdatePasswordComponent,
    TrainingsinweekComponent,
    CalendarioActividadesComponent,
  ],

})
export class CompCompartidosModule { }
