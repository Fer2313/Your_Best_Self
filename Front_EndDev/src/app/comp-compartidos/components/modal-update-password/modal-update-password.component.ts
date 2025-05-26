import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/servicios/alert.service';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';

@Component({
  selector: 'app-modal-update-password',
  templateUrl: './modal-update-password.component.html',
  styleUrls: ['./modal-update-password.component.css'],
})
export class ModalUpdatePasswordComponent {
  @Output() modalUpdateP = new EventEmitter<boolean>();
  constructor(
    private apiservice: ApipeticionesService,
    private alert: AlertService
  ) {}
  closeModal = () => this.modalUpdateP.emit(false);
  emailValue: string = '';

  sendMailResetPassword() {
    this.apiservice
      .sendResetPassword({
        email: this.emailValue,
        verificationLink: environment.clientUrl + '/resetPassword',
      })
      .subscribe(
        () => {
          this.alert.alert({
            title: 'Correo enviado',
            text: 'El correo para resetear tu contraseña ha sido enviado, revisa tu bandeja de entrada',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        },
        (err) => {
          if (err) {
            this.alert.alert({
              title: 'Error al enviar correo',
              text: 'El correo no debe ser invalido',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        }
      );
    this.closeModal();
  }
}
