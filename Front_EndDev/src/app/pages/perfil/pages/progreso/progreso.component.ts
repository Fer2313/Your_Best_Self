import { Component, OnInit } from '@angular/core';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';
import { TrainingLogService } from 'src/app/servicios/training-log.service';
import { Usuario } from 'src/app/interfaces/perfilInterfaces';
@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.component.html',
  providers: [],
})
export class ProgresoComponent implements OnInit {
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
    verify: 'false',
    imagen_perfil: '',
  };

  trainingLogObj: any = {
    calories: { hoy: 0, total: 0 },
    minutos: 0,
    fecha: [],
  };

  constructor(
    private apiservice: ApipeticionesService,
    private trainingLog: TrainingLogService
  ) {}
  ngOnInit(): void {
    this.apiservice.obtenerUsuario().subscribe((data: any) => {
      this.apiservice.getUserById(data.idUsuario).subscribe((data2: any) => {
        this.user = data2;
        this.trainingLogObj = this.trainingLog.getTrainingLog(
          this.user.id_usuario
        );
      });
    });
  }
}
