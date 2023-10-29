import { PersEntrenamientosComponent } from './home/pages/pers-entrenamientos/pers-entrenamientos.component';
import { CompEntrenamientosComponent } from './home/pages/comp-entrenamientos/comp-entrenamientos.component';
import { HomeComponent } from './home/pages/home/home.component';
import { HPComponent } from './home/hp/hp.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
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
