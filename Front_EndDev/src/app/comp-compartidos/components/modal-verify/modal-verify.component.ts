import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/interfaces/perfilInterfaces';
import { AlertService } from 'src/app/servicios/alert.service';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';

@Component({
  selector: 'app-modal-verify',
  templateUrl: './modal-verify.component.html',
  styleUrls: ['./modal-verify.component.css'],
})
export class ModalVerifyComponent {
  arr: Usuario[] = [];
  constructor(private apiService: ApipeticionesService,private alert: AlertService) {}
  @Output() modalVerify = new EventEmitter<boolean>();
  @Input() title: string = '';
  @Input() descripcion: string = '';
  @Input() email: string = '';
  body: any
  handleClose() {
    this.modalVerify.emit(false);
  }
  handleVerify() {
    this.body = {
      email: this.email,
      verificationLink: environment.clientUrl+"/verify"
    }
    this.apiService.sendVerifyUser(this.body).subscribe((data)=>{
      this.alert.alert({
        title: "Comprueba tu correo",
        text: "Hemos enviado un correo de verificacion a tu email, comprueba en tu bandeja de entrada y verificate.",
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    },(error)=>{
      if (error) {
        this.alert.alert({
          title: "Error al enviar correo",
          text: "Error al enviar correo, intenta nuevamente",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    })
    this.modalVerify.emit(false);
    
  }

}
