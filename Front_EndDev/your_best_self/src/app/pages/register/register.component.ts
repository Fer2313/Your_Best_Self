import { Component } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  miFormulario: FormGroup;
  constructor(private fb:FormBuilder){
  this.miFormulario=this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    nombre: ['', Validators.required],
    genero:['',Validators.required],
    peso:[null,Validators.required],
    password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(15)]],
    repeatPassword:['',Validators.required]
  }
  ,
  {
        validator: this.passwordMatchValidator,
      })
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
  submitForm() {
      const formData = this.miFormulario.value;
      console.log(formData)
  }
}
