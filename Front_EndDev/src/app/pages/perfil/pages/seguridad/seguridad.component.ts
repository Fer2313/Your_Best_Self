import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/perfilInterfaces';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/servicios/alert.service';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
})
export class SeguridadComponent implements OnInit {
  body = {}
  modalVerify: boolean = false;
  miFormulario: FormGroup = this.fb.group({
     oldPassword:[
      '',
    ],
    newPassword:[
      '',
      [
        Validators.minLength(8),
        Validators.maxLength(15),
      ],
    ],
    repeatNewPassword:[
      '',
    ],
  },
  {
    validator: this.passwordMatchValidator,
  }
  );
  constructor(private apiservice: ApipeticionesService, private fb: FormBuilder, private alert:AlertService) {}
  user: Usuario = {
    id_usuario: 0,
    nombre: '',
    edad: 0,
    peso: 0,
    altura: 0,
    pesoIdeal: 0,
    sexo: 'none',
    email: '',
    contraseña: '',
    rol: 'none',
    verify: "false",
    imagen_perfil: '',
  };
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('newPassword');
    const confirmPasswordControl = formGroup.get('repeatNewPassword');

    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }
  nuevoemail = ""
  security: boolean = true;
  openModalVerify(){
    this.modalVerify = true
  }
  changePassword(){
    const formData = this.miFormulario.value;
    const {oldPassword, newPassword, repeatNewPassword} = formData;
    if (!oldPassword || !newPassword || !repeatNewPassword) {
      this.alert.alert({
        title: "Faltan campos",
        text: "Para poder actualizar su contraseña, por favor, proporcione todos los campos requeridos",
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }else{
       this.body = {
        id:this.user.id_usuario,
        oldPassword,
        newPassword
      }
      this.alertSaveChanges()
    }
  }
  recivedModalVerify(event: boolean){
    this.modalVerify = event
  }
 alertSaveChanges(){
  Swal.fire({
    title: "Quieres guardar los cambios?",
    showDenyButton: true,
    confirmButtonText: "Guardar",
    denyButtonText: `No guardar`
  }).then((result) => {
    if (result.isConfirmed) {
      this.apiservice.changePassword(this.body).subscribe((data:any)=>{
        Swal.fire("Guardado!", data, "success");
      }, (err)=>{
        Swal.fire("Error al guardar los cambios", err.error.error, "error");
      })
      
    } else if (result.isDenied) {
      Swal.fire("Cambios no guardados", "", "info");
    }
  });
 }
 

  changeEmail(){
    if (this.nuevoemail.length) {
      const body = {
        email: this.user.email,
        newEmail: this.nuevoemail,
        verificationLink: environment.clientUrl + "/changeEmail"
      }
      this.apiservice.sendChangeEmail(body).subscribe((data:any)=>{
        this.alert.alert({
          title: "Correo enviado",
          text: data.correo+", para poder continuar con el cambio de correo revisa la bandeja de entrada de tu correo actual y confirma el cambio",
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      })
    }else{
      this.alert.alert({
        title: "No ingreso un email",
        text: "Para poder actualizar su dirección de correo electrónico, por favor, proporcione un nuevo correo electrónico válido",
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }
  ngOnInit(): void {
    this.apiservice.obtenerUsuario().subscribe((data: any) => {
      this.apiservice.getUserById(data.idUsuario).subscribe((data2: any) => {
        this.user = data2;
        if (this.user.verify === "false") {
          this.security = false;
        } else {
          this.security = true;
        }
      });
    });
  }
}
