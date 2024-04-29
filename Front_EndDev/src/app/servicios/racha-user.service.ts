import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RachaUserService {
  constructor() { }
  calcularRachaMasReciente(entrenamientos: any[]): number {
    let rachaActual = 0;
    const fechaActual = new Date(); // Fecha actual

    // Ordenar los entrenamientos por fecha descendente
    entrenamientos.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

    // Iterar sobre los entrenamientos
    for (let i = 0; i < entrenamientos.length; i++) {
      const fechaEntrenamiento = new Date(entrenamientos[i].fecha);
      
      // Verificar si el entrenamiento es del día anterior al de la fecha actual
      if (fechaEntrenamiento.getFullYear() === fechaActual.getFullYear() &&
          fechaEntrenamiento.getMonth() === fechaActual.getMonth() &&
          fechaEntrenamiento.getDate() === fechaActual.getDate() - 1) {
        rachaActual++; // Incrementar la racha
      } else {
        break; // Si no es del día anterior, salir del bucle
      }
    }
    
    return rachaActual;
  }
}
