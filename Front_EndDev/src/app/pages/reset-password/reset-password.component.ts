import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  verifyResetPassword: string | boolean = 'loading';
  updateToken: any = '';
  miFormulario: FormGroup = this.fb.group(
    {
      password: ['', [Validators.minLength(8), Validators.maxLength(15)]],
      repeatPassword: [''],
    },
    {
      validator: this.passwordMatchValidator,
    }
  );

  constructor(
    private fb: FormBuilder,
    private apiservice: ApipeticionesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('repeatPassword');
    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }
  successChanges(){
    Swal.fire({
      title: "Contraseña actualizada",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        this.handleExit()
      }
    });
   }

  handleExit() {
    this.router.navigate(['/']);
  }
  confirmResetPassword() {
    const password = this.miFormulario.value.password;
    this.apiservice.resetPassword({ token: this.updateToken, password }).subscribe(()=>{
      this.successChanges()
    },(err)=>{
      Swal.fire("Error al guardar los cambios", err.error.error, "error");
    });
  }
  ngOnInit(): void {
    this.updateToken = this.route.snapshot.paramMap.get('token');
    this.apiservice.verifyResetPassword({ token: this.updateToken }).subscribe(
      () => {
        this.verifyResetPassword = true;
      },
      () => {
        this.verifyResetPassword = false;
      }
    );
  }
}
