import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';
import { Router } from '@angular/router';
import { AthenticationService } from 'src/app/servicios/athentication.service';
import { AlertService } from 'src/app/servicios/alert.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  miFormulario: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiPeticiones: ApipeticionesService,
    private router: Router,
    private authService: AthenticationService,
    private alert:AlertService
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
        this.alert.alert({
          title: 'Usuario creado con exito',
          text: data.message,
          icon: 'success',
          confirmButtonText: 'Ok',
        })
        this.router.navigate(['/login']);
      },
      (error) => {
        this.alert.alert({
          title: 'Error al crear usuario',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Ok',
        })
      }
    );
  }
}
