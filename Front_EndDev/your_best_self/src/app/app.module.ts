import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CompCompartidosModule } from './comp-compartidos/comp-compartidos.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { BannerComponent } from './landing-page/banner/banner.component';
import { TargetsComponent } from './landing-page/targets/targets.component';
import { CarruselComponent } from './landing-page/carrusel/carrusel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    BannerComponent,
    TargetsComponent,
    CarruselComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponentComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    CompCompartidosModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
