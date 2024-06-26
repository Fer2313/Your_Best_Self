import { Injectable } from '@angular/core';
import { ApipeticionesService } from './apipeticiones.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TrainingLogService {
  constructor(private apipeticiones: ApipeticionesService) {}

  getTrainingLog(id: number) {
    let trainingLog: any = {
      calories: { hoy: 0, total: 0 },
      minutos: 0,
      fecha: [],
    };
    let dataLog: any;
    const fechaDeHoy = new Date();
    const año = fechaDeHoy.getFullYear();
    const mes = ('0' + (fechaDeHoy.getMonth() + 1)).slice(-2);
    const dia = ('0' + fechaDeHoy.getDate()).slice(-2);
    const fechaFormateada = `${año}-${mes}-${dia}`;
    this.apipeticiones.getTrainingLogById(id).subscribe(
      (data) => {
        dataLog = data;
        let sum = 0;
        let sumhoy = 0;
        let sumM = 0;
        dataLog.forEach((element: any) => {
          if (element.fecha.slice(0, 10) === fechaFormateada) {
            sumhoy += element.kcal;
          }
          sumM += element.minutos;
          sum += element.kcal;
          trainingLog['fecha'].push(element.fecha.slice(0, 10));
        });
        trainingLog['calories']['hoy'] = sumhoy;
        trainingLog['minutos'] = sumM;
        trainingLog['calories']['total'] = sum;
      },
      (err) => {
        console.log(err);
      }
    );
    return trainingLog;
  }

  getWeekTrainnings(id: number) {
    let trainingLog: any;
    const fechaActual = new Date();
    const diasSemana = [
      { name: 'Domingo', training: false },
      { name: 'Lunes', training: false },
      { name: 'Martes', training: false },
      { name: 'Miércoles', training: false },
      { name: 'Jueves', training: false },
      { name: 'Viernes', training: false },
      { name: 'Sábado', training: false },
    ];
    this.apipeticiones.getTrainingLogById(id).subscribe((data) => {
      trainingLog = data;
      for (let index = 0; index < trainingLog.length; index++) {
        if (
          trainingLog[index].fecha.slice(0, 4) === fechaActual.getFullYear() &&
          trainingLog[index].fecha.slice(5, 7) === fechaActual.getMonth() > 10
            ? '0' + fechaActual.getMonth()
            : fechaActual.getMonth()
        ) {
          const diaActual = diasSemana[fechaActual.getDay()].name;
          console.log(diaActual);
        }
      }
    });
    return trainingLog;
  }

  getRacha(id: number): Observable<number> {
    return this.apipeticiones.getTrainingLogById(id).pipe(
      map((data: any[]) => {
        let entrenamientos = data.map((element) => element.fecha.slice(0, 10));

        // Ordenar los entrenamientos por fecha descendente
        entrenamientos.sort(
          (a, b) => new Date(b).getTime() - new Date(a).getTime()
        );

        // Inicializar la fecha de comparación como la fecha actual
        const fechaActual = new Date();
        let fechaComparacion = new Date(fechaActual);
        let rachaActual = 0;

        // Iterar sobre los entrenamientos
        for (let i = 0; i < entrenamientos.length; i++) {
          const fechaEntrenamiento = new Date(entrenamientos[i]);

          // Verificar si el entrenamiento es del día anterior a la fecha de comparación
          if (
            fechaEntrenamiento.getFullYear() ===
              fechaComparacion.getFullYear() &&
            fechaEntrenamiento.getMonth() === fechaComparacion.getMonth() &&
            fechaEntrenamiento.getDate() === fechaComparacion.getDate() - 1
          ) {
            // Incrementar la racha
            rachaActual++;
            // Actualizar la fecha de comparación al día del entrenamiento
            fechaComparacion = fechaEntrenamiento;
          } else {
            break; // Si no es del día anterior, salir del bucle
          }
        }
        return rachaActual;
      })
    );
  }
}
