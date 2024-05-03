import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/interfaces/perfilInterfaces';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-verify',
  templateUrl: './modal-verify.component.html',
  styleUrls: ['./modal-verify.component.css'],
})
export class ModalVerifyComponent {
  arr: Usuario[] = [];
  constructor(private apiService: ApipeticionesService) {}
  @Output() modalVerify = new EventEmitter<boolean>();
  @Input() title: string = '';
  @Input() descripcion: string = '';
  @Input() email: string = '';
  body: any
  successAlert() {
    Swal.fire({
      title: "Comprueba tu correo",
      text: "Hemos enviado un correo de verificacion a tu email, comprueba en tu bandeja de entrada y verificate.",
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  }
  handleClose() {
    this.modalVerify.emit(false);
  }
  handleVerify() {
    this.body = {
      email: this.email,
      verificationLink: "http://localhost:4200/verify"
    }
    this.apiService.sendVerifyUser(this.body).subscribe((data)=>{
      this.successAlert()
    },(error)=>{
   //TODO poner un error alert
    })
    this.modalVerify.emit(false);
    
  }

}
