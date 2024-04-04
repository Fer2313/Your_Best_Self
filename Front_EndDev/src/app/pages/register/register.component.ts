import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AthenticationService } from 'src/app/servicios/athentication.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  miFormulario: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiPeticiones: ApipeticionesService,
    private router: Router,
    private authService: AthenticationService
  ) {
    this.miFormulario = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        genero: ['', Validators.required],
        peso: [null, Validators.required],
        altura: [null, Validators.required],
        edad: [null, Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
          ],
        ],
        repeatPassword: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }
  successAlert(str: string) {
    Swal.fire({
      title: 'Usuario creado con exito',
      text: str,
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }
  errorAlert(str: string) {
    Swal.fire({
      title: 'Error al crear usuario',
      text: str,
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('repeatPassword');

    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }
  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }
  submitForm() {
    const formData = this.miFormulario.value;
    const body = {
      email: formData.email,
      contraseña: formData.password,
      nombre: formData.nombre + ' ' + formData.apellido,
      edad: formData.edad,
      peso: formData.peso,
      altura: formData.altura,
      sexo: formData.genero,
      rol: 'user',
    };
    this.apiPeticiones.registerUser(body).subscribe(
      (data: any) => {
        this.successAlert(data.message);
        this.router.navigate(['/login']);
        /*  this.toastr.success(data.message, "Registro exitoso")
        console.log(data) */
      },
      (error) => {
        this.errorAlert(error.error.message);
        /*   this.toastr.error(error.error.message, "A ocurrido un error al registrarse")
          console.log(error.error.message) */
      }
    );
  }
}
