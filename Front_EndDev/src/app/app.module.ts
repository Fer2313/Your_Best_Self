import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CompCompartidosModule } from './comp-compartidos/comp-compartidos.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AppRoutingModule } from './app-routing.module';
import { BannerComponent } from './pages/landing-page/banner/banner.component';
import { TargetsComponent } from './pages/landing-page/targets/targets.component';
import { CarruselComponent } from './pages/landing-page/carrusel/carrusel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './pages/home/home.module';
import { NotFoundComponentComponent } from './pages/not-found-component/not-found-component.component';
import { HttpClientModule } from '@angular/common/http';


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
    HttpClientModule,
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
