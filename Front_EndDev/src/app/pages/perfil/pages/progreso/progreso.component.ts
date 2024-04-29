import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/perfilInterfaces';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.component.html',
  styleUrls: ['./progreso.component.css']
})
export class ProgresoComponent implements OnInit{
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
constructor(private apiservice:ApipeticionesService){

}
ngOnInit(): void {
  this.apiservice.obtenerUsuario().subscribe((data: any)=>{
    this.apiservice.getUserById(data.idUsuario).subscribe((data2: any) => {
      this.user = data2;
    });
  })
}
}
