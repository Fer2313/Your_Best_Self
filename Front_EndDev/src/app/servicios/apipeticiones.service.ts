import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ApipeticionesService {
  private baseUrl = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {}
  getToken(){
    return {
      headers: new HttpHeaders({
        "authorization" : localStorage.getItem("token")!
      })
    }
  }
  obtenerUsuario(){
    const token = localStorage.getItem("token")
    return this.httpClient.get(this.baseUrl + `user?token=${token}`, this.getToken())
  }
  getMuscles() {
    return this.httpClient.get(this.baseUrl + 'muscle', this.getToken());
  }
   registerUser(body: any){
       return this.httpClient.post(this.baseUrl + "register", body);
   }
   loginUser(body: any){
       return this.httpClient.post(this.baseUrl + "login", body)
   }
  filterEjercices(dificultad: string, categoria: string, arrMusculos: any) {
    if (arrMusculos.length >= 3 && dificultad.length !== 0 && !categoria.length) {
      return this.httpClient.get(
        this.baseUrl +
          `exercises/filters?dificultad=${dificultad}&Musculos=${arrMusculos}`, this.getToken()
      );
    } else if (arrMusculos.length >= 3 && categoria.length !== 0 && !dificultad.length) {
      return this.httpClient.get(
        this.baseUrl +
          `exercises/filters?categoria=${categoria}&Musculos=${arrMusculos}`, this.getToken()
      );
    } else if (arrMusculos.length >= 3 && !categoria.length && !dificultad.length) {
      return this.httpClient.get(
        this.baseUrl + `exercises/filters?Musculos=${arrMusculos}`, this.getToken()
      );
    } else if (categoria.length !== 0 && dificultad.length !== 0  && arrMusculos.length < 3) {
      return this.httpClient.get(
        this.baseUrl +
          `exercises/filters?dificultad=${dificultad}&categoria=${categoria}`, this.getToken()
      );
    } else if (dificultad.length !== 0 && !categoria.length && arrMusculos.length < 3) {
      return this.httpClient.get(
        this.baseUrl + `exercises/filters?dificultad=${dificultad}`, this.getToken()
      );
    } else if (categoria.length !== 0 && !dificultad.length && arrMusculos.length < 3) {
      return this.httpClient.get(
        this.baseUrl + `exercises/filters?categoria=${categoria}`, this.getToken()
      );
    } else 
    return this.httpClient.get(
      this.baseUrl +
        `exercises/filters?dificultad=${dificultad}&categoria=${categoria}&Musculos=${arrMusculos}`, this.getToken()
    );
  }
  getMusclesById(id: number) {
    return this.httpClient.get(this.baseUrl + 'muscle/getMuscleByID/' + id, this.getToken());
  }
  getEjercices() {
    return this.httpClient.get(this.baseUrl + 'exercise', this.getToken());
  }
  getEjercicesLength() {
    return this.httpClient.get(this.baseUrl + 'exercisesLength', this.getToken());
  }
  getEjercicesPaginate(currentPage: number, itemsPerPage: number) {
    return this.httpClient.get(
      `${this.baseUrl}exercise?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&tabla=ejercicios`, this.getToken()
    );
  }
  getExercicebyID(id: any) {
    return this.httpClient.get(this.baseUrl + 'exercise/getExerciseByID/' + id, this.getToken());
  }
}
