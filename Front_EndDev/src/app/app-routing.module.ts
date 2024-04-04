import { LibrayEjecicesComponent } from './pages/home/pages/libray-ejecices/libray-ejecices.component';
import { PersEntrenamientosComponent } from './pages/home/pages/pers-entrenamientos/pers-entrenamientos.component';
import { CompEntrenamientosComponent } from './pages/home/pages/comp-entrenamientos/comp-entrenamientos.component';
import { HomeComponent } from './pages/home/pages/home/home.component';
import { HPComponent } from './pages/home/hp/hp.component';
import { NotFoundComponentComponent } from './pages/not-found-component/not-found-component.component';
import { NgModule } from '@angular/core';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { loginGuard } from '../../guards/loginguard';
import { noLoginguard } from '../../guards/Nologinandregisterguard';
import { EntrenamientosComponent } from './pages/home/pages/entrenamientos/entrenamientos.component';
import { InfoGeneralComponent } from './pages/perfil/pages/info-general/info-general.component';
import { SeguridadComponent } from './pages/perfil/pages/seguridad/seguridad.component';
import { ProgresoComponent } from './pages/perfil/pages/progreso/progreso.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { ChangeEmailComponent } from './pages/change-email/change-email.component';
import { DeleteUserComponent } from './pages/delete-user/delete-user.component';

const router: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [noLoginguard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [noLoginguard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [noLoginguard],
  },
  {
    path:"verify/:email/:id",
    component: VerifyComponent,
  },
  { 
    path:"changeEmail/:token",
    component:ChangeEmailComponent,
  },
  { 
    path:"deleteUser/:token",
    component:DeleteUserComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    children: [
      {
          path:'',
          component: InfoGeneralComponent
      },
      {
          path:'seguridad',
          component: SeguridadComponent
      },
      {
          path:'progreso',
          component: ProgresoComponent
      },
    
    ],
    canActivate: [loginGuard],
  },
  {
    path: 'home',
    component: HPComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'comp_entrenamientos',
        component: CompEntrenamientosComponent,
      },
      {
        path: 'entrenamiento/:id',
        component: EntrenamientosComponent,
      },
      {
        path: 'pers_entrenamientos',
        component: PersEntrenamientosComponent,
      },
      {
        path: 'library_Ejercices',
        component: LibrayEjecicesComponent,
      },
    ],
    canActivate: [loginGuard],
  },
  { path: '**', component: NotFoundComponentComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(router)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
