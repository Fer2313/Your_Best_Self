import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/perfilInterfaces';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';
import { AlertService } from 'src/app/servicios/alert.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-info-general',
  templateUrl: './info-general.component.html',
})
export class InfoGeneralComponent implements OnInit {
  body: any;
  user: Usuario = {
    id_usuario: 0,
    nombre: '',
    edad: 0,
    peso: 0,
    altura: 0,
    pesoIdeal:0,
    sexo: 'none',
    email: '',
    contraseña: '',
    rol: 'none',
    verify: "false",
    imagen_perfil: '',
  };
  selectedFile?: File;
  error_image: boolean = false;
  constructor(private apiService: ApipeticionesService, private fb: FormBuilder, private alert:AlertService) {
  }
  miFormulario: FormGroup = this.fb.group({
    nombre:["", [Validators.required]],
    peso:["",[Validators.required]],
    pesoIdeal:["",[Validators.required]],
    altura:["", [Validators.required]],
    edad: ["",[Validators.required]],
    genero:["", [Validators.required]]
  });

  submitForm(){
    const formData = this.miFormulario.value;
    formData["id"] = this.user.id_usuario
    this.apiService.uploadUser(formData).subscribe((data:any)=>{
      this.successAlert(data.message, data.status);
    })
  }

  successAlert(title: string, text: string) {
   this.alert.alert({
    title: title,
    text: "Status "+ text,
    icon: 'success',
    confirmButtonText: 'Ok',
  })
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (!this.selectedFile?.type?.includes('image')) {
      this.error_image = true;
    } else {
      this.error_image = false;
      const file = new FormData();
      file.append('imagen', this.selectedFile);
      this.apiService.uploadCloudinary(file).subscribe((data: any) => {
        const updateData = {
          id: this.user.id_usuario,
          image: data.url,
        };
        if (data) {
          this.apiService.uploadUser(updateData).subscribe((data: any) => {
            this.successAlert(data.message, data.status);
          });
        }
      });
    }
  }

  deleteAccount(){
    this.body = {
      email: this.user.email,
      verificationLink: environment.clientUrl+"/deleteUser"
    }
  Swal.fire({
    title: "Estas seguro de que quieres eliminar tu cuenta?",
    showDenyButton: true,
    confirmButtonText: "Eliminar",
    denyButtonText: `No eliminar`
  }).then((result) => {
    if (result.isConfirmed) {
      this.apiService.sendDeleteUser(this.body).subscribe(()=>{
        Swal.fire("Correo para confirmar la eliminacion de tu cuenta enviado!","", "success");
      }, ()=>{
        Swal.fire("Error al enviar", "error");
      })
    } else if (result.isDenied) {
      Swal.fire("Me alegra que decidas quedarte.", "",);
    }
  });
  }

  ngOnInit(): void {
    this.apiService.obtenerUsuario().subscribe((data: any) => {
      this.apiService.getUserById(data.idUsuario).subscribe((data2: any) => {
        this.user = data2;
      });
    });
  }
}
