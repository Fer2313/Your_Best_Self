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

  getWeekTrainnings(id: number): Promise<any> {
    const fechaActual = new Date();
    const diasSemana: any = [
      { name: 'Domingo', training: 'Non' },
      { name: 'Lunes', training: 'Non' },
      { name: 'Martes', training: 'Non' },
      { name: 'Miércoles', training: 'Non' },
      { name: 'Jueves', training: 'Non' },
      { name: 'Viernes', training: 'Non' },
      { name: 'Sábado', training: 'Non' },
    ];
    return new Promise<void>((resolve, reject) => {
      this.apipeticiones.getTrainingLogById(id).subscribe(
        (data) => {
          const datalog = data;
          for (let index = 0; index < datalog.length; index++) {
            if (
              datalog[index].fecha.slice(0, 4) === fechaActual.getFullYear() &&
              datalog[index].fecha.slice(5, 7) === fechaActual.getMonth() > 10
                ? '0' + fechaActual.getMonth()
                : fechaActual.getMonth()
            ) {
              let currentArrayDay = fechaActual.getDay();
              let diaActualNumero = fechaActual.getDate();
              let diaActualNombre = diasSemana[currentArrayDay].name;
              if (diaActualNombre === 'Domingo' && diaActualNumero == datalog[index].fecha.slice(8, 10)) {
                diasSemana[0].training = true;
              }else if(diaActualNombre !== 'Domingo' && diaActualNumero != datalog[index].fecha.slice(8, 10)){
                diasSemana[0].training = false;
              }
              while (diaActualNombre !== 'Domingo') {
                if (diaActualNumero == datalog[index].fecha.slice(8, 10)) {
                  diasSemana[currentArrayDay].training = true;
                  diaActualNumero = diaActualNumero - 1;
                  currentArrayDay = currentArrayDay - 1;
                  diaActualNombre = diasSemana[currentArrayDay].name;
                } else {
                  if (
                    diaActualNombre === diasSemana[fechaActual.getDay()].name
                  ) {
                    console.log(
                      diaActualNombre,
                      diasSemana[fechaActual.getDay()].name
                    );
                    diaActualNumero = diaActualNumero - 1;
                    currentArrayDay = currentArrayDay - 1;
                    diaActualNombre = diasSemana[currentArrayDay].name;
                  } else {
                    diasSemana[currentArrayDay].training = false;
                    diaActualNumero = diaActualNumero - 1;
                    currentArrayDay = currentArrayDay - 1;
                    diaActualNombre = diasSemana[currentArrayDay].name;
                  }
                }
              }
            }
          }
          resolve(diasSemana);
        },
        (err) => {
          reject(err);
        }
      );
    });
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
