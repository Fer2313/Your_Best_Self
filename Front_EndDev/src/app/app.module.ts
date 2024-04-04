import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CompCompartidosModule } from './comp-compartidos/comp-compartidos.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
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
import { AuthModule } from '@auth0/auth0-angular';
import { NgIconsModule } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { InfoGeneralComponent } from './pages/perfil/pages/info-general/info-general.component';
import { ProgresoComponent } from './pages/perfil/pages/progreso/progreso.component';
import { SeguridadComponent } from './pages/perfil/pages/seguridad/seguridad.component';
import { PerfilModule } from './pages/perfil/perfil.module';
import { VerifyComponent } from './pages/verify/verify.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChangeEmailComponent } from './pages/change-email/change-email.component';
import { DeleteUserComponent } from './pages/delete-user/delete-user.component';


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
    VerifyComponent,
    ChangeEmailComponent,
    DeleteUserComponent,
  ],
  imports: [
    AuthModule.forRoot({
      domain: 'dev-ggwsk35kn6tzmdhq.us.auth0.com',
      clientId: '4XyhRiwtfinxhwemj0Bhi76pvGtTyLjH',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    NgIconsModule.withIcons({ heroUsers }),
    HttpClientModule,
    FormsModule,
    BrowserModule,
    CompCompartidosModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HomeModule,  
    PerfilModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
