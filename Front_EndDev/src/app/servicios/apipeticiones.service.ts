import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ApipeticionesService {
  private baseUrl = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {}
  getMuscles() {
    return this.httpClient.get(this.baseUrl + 'muscle');
  }
  
  getExercicesByName( name: string ){
    return this.httpClient.get(this.baseUrl + 'exercise/getExercisesByName/' + name);
  }

  filterEjercices(dificultad: string, categoria: string, arrMusculos: any) {
    if (arrMusculos.length >= 3 && dificultad.length !== 0 && !categoria.length) {
      return this.httpClient.get(
        this.baseUrl +
          `exercises/filters?dificultad=${dificultad}&Musculos=${arrMusculos}`
      );
    } else if (arrMusculos.length >= 3 && categoria.length !== 0 && !dificultad.length) {
      return this.httpClient.get(
        this.baseUrl +
          `exercises/filters?categoria=${categoria}&Musculos=${arrMusculos}`
      );
    } else if (arrMusculos.length >= 3 && !categoria.length && !dificultad.length) {
      return this.httpClient.get(
        this.baseUrl + `exercises/filters?Musculos=${arrMusculos}`
      );
    } else if (categoria.length !== 0 && dificultad.length !== 0  && arrMusculos.length < 3) {
      return this.httpClient.get(
        this.baseUrl +
          `exercises/filters?dificultad=${dificultad}&categoria=${categoria}`
      );
    } else if (dificultad.length !== 0 && !categoria.length && arrMusculos.length < 3) {
      return this.httpClient.get(
        this.baseUrl + `exercises/filters?dificultad=${dificultad}`
      );
    } else if (categoria.length !== 0 && !dificultad.length && arrMusculos.length < 3) {
      return this.httpClient.get(
        this.baseUrl + `exercises/filters?categoria=${categoria}`
      );
    } else 
    return this.httpClient.get(
      this.baseUrl +
        `exercises/filters?dificultad=${dificultad}&categoria=${categoria}&Musculos=${arrMusculos}`
    );
  }
  getMusclesById(id: number) {
    return this.httpClient.get(this.baseUrl + 'muscle/getMuscleByID/' + id);
  }
  getEjercices() {
    return this.httpClient.get(this.baseUrl + 'exercise');
  }
  getEjercicesLength() {
    return this.httpClient.get(this.baseUrl + 'exercisesLength');
  }
  getEjercicesPaginate(currentPage: number, itemsPerPage: number) {
    return this.httpClient.get(
      `${this.baseUrl}exercise?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&tabla=ejercicios`
    );
  }
  getExercicebyID(id: any) {
    return this.httpClient.get(this.baseUrl + 'exercise/getExerciseByID/' + id);
  }
}
