import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from 'environment';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-update-password',
  templateUrl: './modal-update-password.component.html',
  styleUrls: ['./modal-update-password.component.css'],
})
export class ModalUpdatePasswordComponent {
  @Output() modalUpdateP = new EventEmitter<boolean>();
  constructor(private apiservice:ApipeticionesService){}
  closeModal = () => this.modalUpdateP.emit(false);
  emailValue: string = '';
 
  sendMailResetPassword(){
    this.apiservice.sendResetPassword({email:this.emailValue, verificationLink:environment.clientUrl+"/resetPassword"}).subscribe(()=>{},(err)=>{
      this.errorAlert2()
    })
    this.closeModal()
  }
  
  errorAlert() {
    Swal.fire({
      title: 'Error al enviar correo',
      text: "El correo no debe ser invalido",
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }
  errorAlert2() {
    Swal.fire({
      title: 'Error al resetear contraseña',
      text: "Algo salio mal",
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }
}

