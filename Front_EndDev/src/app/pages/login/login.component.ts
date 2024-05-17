import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/servicios/alert.service';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';
import { AthenticationService } from 'src/app/servicios/athentication.service';
interface Usuario {
  email: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private apiservice: ApipeticionesService,
    private router: Router,
    private alert:AlertService,
    private authService: AthenticationService
  ) {}
  openModalUpadateP: boolean = false;
  user: Usuario = {
    email: '',
    password: '',
  };
  openModal = () => (this.openModalUpadateP = true);
  reciveBooleanM = (e: boolean) => (this.openModalUpadateP = e);
  handleConsole() {
    const email = this.user.email;
    const contraseña = this.user.password;
    const user = {
      email,
      contraseña,
    };
    this.apiservice.loginUser(user).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.token['token']);
        this.alert.alert({
          title: 'Usuario loggeado con exito',
          text: data.message,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.router.navigate([data.redirect]);
      },
      (error) => {
        this.alert.alert({
          title: 'Error al iniciar session',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }
  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }
}
