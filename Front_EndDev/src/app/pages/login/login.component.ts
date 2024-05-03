import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';
import { AthenticationService } from 'src/app/servicios/athentication.service';
import Swal from 'sweetalert2';
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
    private authService: AthenticationService
  ) {}
  openModalUpadateP: boolean = false;
  user: Usuario = {
    email: '',
    password: '',
  };
  openModal = () => (this.openModalUpadateP = true);
  reciveBooleanM = (e: boolean) => (this.openModalUpadateP = e);
  successAlert(str: string) {
    Swal.fire({
      title: 'Usuario loggeado con exito',
      text: str,
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }
  errorAlert(str: string) {
    Swal.fire({
      title: 'Error al iniciar session',
      text: str,
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }

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
        this.successAlert(data.message);
        this.router.navigate([data.redirect]);
      },
      (error) => {
        this.errorAlert(error.error.message);
      }
    );
  }
  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }
}
