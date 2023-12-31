import { LibrayEjecicesComponent } from './pages/home/pages/libray-ejecices/libray-ejecices.component';
import { PersEntrenamientosComponent } from './pages/home/pages/pers-entrenamientos/pers-entrenamientos.component';
import { CompEntrenamientosComponent } from './pages/home/pages/comp-entrenamientos/comp-entrenamientos.component';
import { HomeComponent } from './pages/home/pages/home/home.component';
import { HPComponent } from './pages/home/hp/hp.component';
import { NotFoundComponentComponent } from './pages/not-found-component/not-found-component.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
const router: Routes = [
  {
    path:"",
    component: LandingPageComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"home",
    component:HPComponent,
    children:[
      {
        path:"",
        component:HomeComponent
      },
      {
        path:"comp_entrenamientos",
        component:CompEntrenamientosComponent
      },
      {
        path:"pers_entrenamientos",
        component:PersEntrenamientosComponent
      },
      {
        path:"library_Ejercices",
        component:LibrayEjecicesComponent
      }
    ],
  },
  { path: '**', component: NotFoundComponentComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(router)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
