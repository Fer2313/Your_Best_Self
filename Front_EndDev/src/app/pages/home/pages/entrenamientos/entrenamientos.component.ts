import { Ejercicio, Training } from './../../../../interfaces/homeIntefaces';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { Usuario } from 'src/app/interfaces/perfilInterfaces';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';

@Component({
  selector: 'app-entrenamientos',
  templateUrl: './entrenamientos.component.html',
})
export class EntrenamientosComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private apiService: ApipeticionesService,
    private router: Router
  ) {}
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
  Kcal: number = 0;
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
  modal: boolean = false;
  start: boolean = false;
  currentExercice: number = 0;
  modalAlert: boolean = false;
  series: any;
  tiempoTranscurrido = 0;
  cronometroSubscription?: Subscription;

  iniciarCronometro() {
    this.cronometroSubscription = interval(1000).subscribe(() => {
      this.tiempoTranscurrido++;
    });
  }

  detenerCronometro() {
    this.cronometroSubscription?.unsubscribe();
  }

  reiniciarCronometro() {
    this.tiempoTranscurrido = 0;
  }

  startTraining() {
    this.start = true;
    this.ejercicio =
      this.training.ejercicios_relacionados![this.currentExercice];
    this.series = this.ejercicio.series;
    this.modal_temporizador = true;
    this.iniciarCronometro();
  }

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
  recivedFinishB(event: boolean) {
    // Se detiene el cronometro
    this.detenerCronometro();
    // Se cierra el modal y termina el entrenamiento
    this.modalAlert = event;
    // Se recuperan los datos del usuario
    this.apiService.obtenerUsuario().subscribe((data: any) => {
      this.apiService.getUserById(data.idUsuario).subscribe((data2: any) => {
        this.user = data2;
        // Se calcula que MET tiene cada ejercicio
        let MET = 0;
        if (this.training.ejercicios_relacionados !== null) {
          for (
            let index = 0;
            index < this.training.ejercicios_relacionados.length;
            index++
          ) {
            if (
              this.training.ejercicios_relacionados[index].dificultad ===
              'Principiante'
            ) {
              MET += 2.8;
            }
            if (
              this.training.ejercicios_relacionados[index].dificultad ===
              'Experimentado'
            ) {
              MET += 3.8;
            }
            if (
              this.training.ejercicios_relacionados[index].dificultad ===
              'Avanzado'
            ) {
              MET += 8.0;
            }
          }
          // Se calcula el promedio MET del ejercicio
          const promedioMET =
            MET / this.training.ejercicios_relacionados.length - 1;
          // Se calcula el factor de actividad
          const minutos = Math.round(this.tiempoTranscurrido / 60);
          const factorActividad = promedioMET * (minutos / 60);
          //se reicicia el tiempo transcurrido
          this.tiempoTranscurrido = 0;
          // Se calcula el metabolismo basal (MB)
          let altura = Math.round(this.user.altura * 100);
          const MB =
            88.362 +
            13.397 * this.user.peso +
            4.799 * altura -
            5.677 * this.user.edad;
          // Se calculan las calorias gastadas
          const kcal = Math.round(MB * factorActividad);
          // Obtiene la fecha actual
          const fechaDeHoy = new Date();
          const año = fechaDeHoy.getFullYear();
          // Agrega un cero al mes si es menor que 10
          const mes = ('0' + (fechaDeHoy.getMonth() + 1)).slice(-2);
          // Agrega un cero al día si es menor que 10
          const dia = ('0' + fechaDeHoy.getDate()).slice(-2);
          const fechaFormateada = `${año}-${mes}-${dia}`;
          this.Kcal = kcal;
          this.apiService
            .trainingLog({
              id_usuario: this.user.id_usuario,
              id_entrenamiento: this.training.id_entrenamiento,
              fecha: fechaFormateada,
              kcal,
              minutos,
            })
            .subscribe(
              (data: any) => {
                //TODO Poner sucess alert
                console.log(data);
              },
              (err) => {
                //TODO Poner error alert
                console.log(err);
              }
            );
        }
      });
    });
    // Se reinicia el tiempo transcurrido
    this.reiniciarCronometro;
  }
  recivedBoolean(event: boolean) {
    this.modalAlert = event;
  }
  recivedBooleanS(event: boolean) {
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

  ngOnDestroy() {
    if (this.cronometroSubscription) {
      this.cronometroSubscription.unsubscribe();
    }
  }
}
