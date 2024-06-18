import { Injectable } from '@angular/core';
import { ApipeticionesService } from './apipeticiones.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingLogService {
  constructor(private apipeticiones: ApipeticionesService) {}
  getTrainingLog(id: number) {
    let trainingLog: any = {
      calories: { hoy: 0, total: 0 },
      minutos: 0,
      fecha:[]
    };
    let dataLog: any;
    const fechaDeHoy = new Date();
    const año = fechaDeHoy.getFullYear();
    const mes = ('0' + (fechaDeHoy.getMonth() + 1)).slice(-2);
    const dia = ('0' + fechaDeHoy.getDate()).slice(-2);
    const fechaFormateada = `${año}-${mes}-${dia}`;
    this.apipeticiones.getTrainingLogById(id).subscribe(
      (data) => {
        console.log(data)
        dataLog = data;
        let sum = 0;
        let sumhoy = 0
        let sumM = 0
        dataLog.forEach((element: any) => {
          if (element.fecha.slice(0, 10) === fechaFormateada) {
            sumhoy += element.kcal;
          }
          sumM += element.minutos
          sum += element.kcal;
          trainingLog["fecha"].push(element.fecha.slice(0,10))
          console.log(trainingLog["fecha"][0].slice(0,4))
        });
       trainingLog["calories"]["hoy"] = sumhoy
       trainingLog["minutos"] = sumM
       trainingLog["calories"]["total"] = sum;
      },
      (err) => {
        console.log(err);
      }
    );
    
   return trainingLog
  }
  getRacha(){

  }

}
