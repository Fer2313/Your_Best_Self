import { Ejercicio, Training } from './../../../../interfaces/homeIntefaces';
import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';

@Component({
  selector: 'app-entrenamientos',
  templateUrl: './entrenamientos.component.html',
  styleUrls: ['./entrenamientos.component.css'],
})
export class EntrenamientosComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apiService: ApipeticionesService,
    private router: Router
  ) {
    console.log(this.series);
  }
  training: Training = {
    id_entrenamiento: 0,
    id_usuario: 0,
    nombre_entrenamiento: '',
    dificultad: 0,
    descripcion: '',
    fecha: '',
    imagen: '',
    descanso_entre_series: 0,
    descanso_entre_ejercicio: 0,
    ejercicios_relacionados: [],
  };
  ejercicio: Ejercicio = {
    Id_ejercicios: 0,
    nombre_ejercicios: '',
    descripcion: '',
    video: '',
    imagen: '',
    categoria: '',
    dificultad: '',
    series: null,
    repeticiones: null,
    tiempo: 0,
    lado: null,
  };
  modal_temporizador: boolean = false;
 /*  tiempo: number = 15; */
  modal: boolean = false;
  start: boolean = false;
  currentExercice: number = 0;
  modalAlert: boolean = false;
/*   Temporizador: any;
  tiempoEjercicio: number = 0; */
  series: any;

/*   iniciarTemporizador(): void {
    console.log(this.ejercicio.tiempo, 'hasdfasdf');
    this.tiempoEjercicio = this.ejercicio.tiempo;
    console.log(this.tiempoEjercicio, 'hola12312');
    this.Temporizador = setInterval(() => {
      if (this.tiempoEjercicio > 0) {
        this.tiempoEjercicio--;
      } else {
        this.detenerTemporizador();
        // Puedes agregar acciones adicionales cuando el temporizador llega a cero
      }
    }, 1000);
  } */

/*   detenerTemporizador(): void {
    clearInterval(this.Temporizador);
  } */

  startTraining() {
    this.start = true;
    this.ejercicio =
      this.training.ejercicios_relacionados![this.currentExercice];
    this.series = this.ejercicio.series;
    this.modal_temporizador = true;
  }
/*   nextExercice() {
    if (this.ejercicio.series !== null) {
      this.tiempo = this.training.descanso_entre_series;
      this.ejercicio.series--;
      this.modal_temporizador = true;
    } else {
      this.tiempo = this.training.descanso_entre_ejercicio;
      this.currentExercice++;
      this.ejercicio =
        this.training.ejercicios_relacionados![this.currentExercice];
        console.log(this.ejercicio, this.currentExercice)
      if (this.ejercicio.tiempo !== 0) {
        this.detenerTemporizador();
      }
      this.modal_temporizador = true;
    }
    if (this.ejercicio.series === 0) {
      this.tiempo = this.training.descanso_entre_ejercicio;
      this.currentExercice++;
      this.ejercicio =
        this.training.ejercicios_relacionados![this.currentExercice];
        console.log(this.ejercicio, this.currentExercice)
      if (this.ejercicio.tiempo !== 0) {
        this.detenerTemporizador();
      }
      this.modal_temporizador = true;
    }
  } */
/*   previousExercice() {
    if (this.ejercicio.series !== null && this.series !== this.ejercicio.series) {
      this.tiempo = this.training.descanso_entre_series;
      this.ejercicio.series++;
      this.modal_temporizador = true;
    } else {
      this.tiempo = this.training.descanso_entre_ejercicio;
      this.currentExercice = this.currentExercice - 1;
      this.ejercicio =
        this.training.ejercicios_relacionados![this.currentExercice];
        
        if (this.ejercicio.repeticiones) {
          if (this.ejercicio.series !== null ) {
            this.ejercicio.series++
          }
        }
      if (this.ejercicio.tiempo !== 0) {
        this.detenerTemporizador();
      }
      this.modal_temporizador = true;
    }
     if (this.ejercicio.series === 0) {
      this.tiempo = this.training.descanso_entre_ejercicio;
      this.currentExercice--;
      this.ejercicio =
        this.training.ejercicios_relacionados![this.currentExercice];
        console.log(this.ejercicio, this.currentExercice)
      if (this.ejercicio.tiempo !== 0) {
        this.detenerTemporizador();
      }
      this.modal_temporizador = true;
    } 
     if (this.ejercicio.series) {
      this.ejercicio.series++;
    } else {
      this.currentExercice--;
      this.ejercicio =
        this.training.ejercicios_relacionados![this.currentExercice];
    } 
  } */

  handleModal(item: Ejercicio) {
    this.apiService
      .getExercicebyID(item.Id_ejercicios)
      .subscribe((data: any) => {
        this.ejercicio = data;
        if (item.series) {
          this.ejercicio['series'] = item.series;
        }
        if (item.repeticiones) {
          this.ejercicio['repeticiones'] = item.repeticiones;
        }
        if (item.tiempo) {
          this.ejercicio['tiempo'] = item.tiempo;
        }
        if (item.lado) {
          this.ejercicio['lado'] = item.lado;
        }
      });
    this.modal = true;
  }
  recivedFinishB(event: boolean){
    this.modalAlert = event;
  }
  recivedBoolean(event:boolean){
    this.modalAlert = event
  }
  recivedBooleanS(event:boolean){
    this.start = event;
    this.route.params.subscribe((id: any) => {
      this.apiService.getTrainingById(id.id).subscribe(
        (data: any) => {
          this.training = data;
        },
        (error) => {
          if (error) {
            this.router.navigate(['Page_not_Found']);
          }
        }
      );
    });
  }
  recivedBooleanM(event: boolean) {
    this.modal = event;
  }
/*   recivedBooleanMC(event: boolean) {
    this.modal_temporizador = event;
  }
  recivedTime(event: boolean) {
    if (event === true) {
      if (this.ejercicio.tiempo !== 0 && this.ejercicio.tiempo !== null) {
        this.iniciarTemporizador();
      }
    }
  }
  ngOnDestroy(): void {
    this.detenerTemporizador();
  } */

  ngOnInit(): void {
    this.route.params.subscribe((id: any) => {
      this.apiService.getTrainingById(id.id).subscribe(
        (data: any) => {
          this.training = data;
        },
        (error) => {
          if (error) {
            this.router.navigate(['Page_not_Found']);
          }
        }
      );
    });
  }
}
