import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Ejercicio, Training } from 'src/app/interfaces/homeIntefaces';

@Component({
  selector: 'app-inicio-entrenamiento',
  templateUrl: './inicio-entrenamiento.component.html',
  styleUrls: ['./inicio-entrenamiento.component.css'],
})
export class InicioEntrenamientoComponent implements OnDestroy{
  @Output() finishBoolean = new EventEmitter<boolean>()
  @Output() start = new EventEmitter<boolean>();
  @Input() ejercicio2: Ejercicio = {
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
  @Input() series: any;
  @Input() training: Training = {
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
  tiempo: number = 15;
  tiempoEjercicio: number = 0;
  modal_temporizador: boolean = true;
  currentExercice: number = 0;
  Temporizador: any;
  pausaBoolean: boolean = false;
  alertBoolean: boolean = false;
  iniciarTemporizador(): void {
    this.tiempoEjercicio = this.ejercicio2.tiempo;
    this.Temporizador = setInterval(() => {
      if (this.tiempoEjercicio > 0) {
        this.tiempoEjercicio--;
      } else {
        this.detenerTemporizador();
        // Puedes agregar acciones adicionales cuando el temporizador llega a cero
      }
    }, 1000);
  }
  handleAlert(){
    if (this.ejercicio2.tiempo) {
        this.pausaBoolean = true
    if (this.pausaBoolean) {
      this.detenerTemporizador()
    }
    }
    this.alertBoolean = true;
  }
  detenerTemporizador(): void {
    clearInterval(this.Temporizador);
  }
  recivedBooleanS(event: boolean) {
    this.start.emit(event);
  }
  recivedBooleanMC(event: boolean) {
    this.modal_temporizador = event;
  }
  recivedBoolean(event:boolean){
    if (this.ejercicio2.tiempo) {
      this.iniciarTemporizador()
    }
    this.alertBoolean = event
  }
  handleExit(event: boolean){
    this.start.emit(event) 
  }
  recivedTime(event: boolean) {
    if (event === true) {
      if (this.ejercicio2.tiempo !== 0 && this.ejercicio2.tiempo !== null) {
        this.iniciarTemporizador();
      }
    }
  }
  ngOnDestroy(): void {
    this.detenerTemporizador();
  }

  nextExercice() {
    if (this.currentExercice + 1 === this.training.ejercicios_relacionados?.length && this.ejercicio2.series === 1) {
      this.start.emit(false)
      this.finishBoolean.emit(true)
    }
    else if (this.ejercicio2.tiempo && this.currentExercice + 1 === this.training.ejercicios_relacionados?.length) {
      this.start.emit(false)
      this.finishBoolean.emit(true)
    }
    if (this.ejercicio2.series !== null) {
      this.tiempo = this.training.descanso_entre_series;
      this.ejercicio2.series--;
      this.modal_temporizador = true;
    } else {
      this.tiempo = this.training.descanso_entre_ejercicio;
      this.currentExercice++;
      this.ejercicio2 =
        this.training.ejercicios_relacionados![this.currentExercice];
      console.log(this.ejercicio2, this.currentExercice);
      if (this.ejercicio2.tiempo !== 0) {
        this.detenerTemporizador();
      }
      this.modal_temporizador = true;
    }
    if (this.ejercicio2.series === 0) {
      this.tiempo = this.training.descanso_entre_ejercicio;
      this.currentExercice++;
      this.ejercicio2 =
        this.training.ejercicios_relacionados![this.currentExercice];
      console.log(this.ejercicio2, this.currentExercice);
      if (this.ejercicio2.tiempo !== 0) {
        this.detenerTemporizador();
      }
      this.modal_temporizador = true;
    }
  }

  previousExercice() {
    console.log(this.series, this.ejercicio2.series);
    if (
      this.ejercicio2.series !== null &&
      this.series !== this.ejercicio2.series
    ) {
      this.tiempo = this.training.descanso_entre_series;
      this.ejercicio2.series++;
      this.modal_temporizador = true;
    } else {
      this.tiempo = this.training.descanso_entre_ejercicio;
      this.currentExercice = this.currentExercice - 1;
      this.ejercicio2 =
        this.training.ejercicios_relacionados![this.currentExercice];
      if (this.ejercicio2.repeticiones) {
        if (this.ejercicio2.series !== null) {
          this.ejercicio2.series++;
        }
      }
      if (this.ejercicio2.tiempo !== 0) {
        this.detenerTemporizador();
      }
      this.modal_temporizador = true;
    }
    if (this.ejercicio2.series === 0) {
      this.tiempo = this.training.descanso_entre_ejercicio;
      this.currentExercice--;
      this.ejercicio2 =
        this.training.ejercicios_relacionados![this.currentExercice];
      console.log(this.ejercicio2, this.currentExercice);
      if (this.ejercicio2.tiempo !== 0) {
        this.detenerTemporizador();
      }
      this.modal_temporizador = true;
    }
    /*  if (this.ejercicio.series) {
      this.ejercicio.series++;
      console.log("hola3")
    } else {
      this.currentExercice--;
      this.ejercicio =
        this.training.ejercicios_relacionados![this.currentExercice];
    }  */
  }

}
