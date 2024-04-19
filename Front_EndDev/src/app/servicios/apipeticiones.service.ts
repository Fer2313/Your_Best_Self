import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
@Injectable({
  providedIn: 'root',
})
/* {
  headers: new HttpHeaders({
    authorization: localStorage.getItem('token')!,
    'Content-Type': 'multipart/form-data',
  }),
}
 */
export class ApipeticionesService {
  private baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}
  getToken() {
    return {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('token')!,
      }),
    };
  }
  sendVerifyUser(body: any) {
    return this.httpClient.post(
      this.baseUrl + 'sendVerifyUser',
      body,
      this.getToken()
    );
  }
  VerifyUser(body: any) {
    console.log(body);
    return this.httpClient.post(this.baseUrl + 'verifyUser', body);
  }
  sendResetPassword(body: any) {
    return this.httpClient.post(this.baseUrl + 'sendResetPassword', body);
  }
  verifyResetPassword(body: any) {
    return this.httpClient.post(this.baseUrl + 'verifyResetPassword', body);
  }
  resetPassword(body:any){
    return this.httpClient.patch(this.baseUrl + 'resetPassword', body)
  }
  sendDeleteUser(body: any) {
    return this.httpClient.post(
      this.baseUrl + 'sendDeleteUser',
      body,
      this.getToken()
    );
  }
  deleteUser(token: string) {
    return this.httpClient.delete(
      this.baseUrl + 'deleteUser/' + token,
      this.getToken()
    );
  }
  sendChangeEmail(body: any) {
    return this.httpClient.post(
      this.baseUrl + 'sendChangeEmail',
      body,
      this.getToken()
    );
  }
  changeEmail(body: any) {
    return this.httpClient.patch(this.baseUrl + 'changeEmail', body);
  }
  changePassword(body: any) {
    return this.httpClient.patch(
      this.baseUrl + 'changePassword',
      body,
      this.getToken()
    );
  }
  uploadCloudinary(file: any) {
    return this.httpClient.post(
      this.baseUrl + 'cloudinary',
      file,
      this.getToken()
    );
  }
  getUsers() {
    return this.httpClient.get(this.baseUrl + 'allUsers', this.getToken());
  }
  getUsersOnlyEmail() {
    return this.httpClient.get(
      this.baseUrl + 'allUsers?onlyemail=true',
      this.getToken()
    );
  }
  uploadUser(body: any) {
    return this.httpClient.patch(this.baseUrl + 'user', body, this.getToken());
  }
  obtenerUsuario() {
    const token = localStorage.getItem('token');
    return this.httpClient.get(
      this.baseUrl + `user?token=${token}`,
      this.getToken()
    );
  }
  getTrainings() {
    return this.httpClient.get(this.baseUrl + 'training', this.getToken());
  }
  getTrainingById(id: number) {
    return this.httpClient.get(
      this.baseUrl + 'training/getTrainingByID/' + id,
      this.getToken()
    );
  }
  getMuscles() {
    return this.httpClient.get(this.baseUrl + 'muscle', this.getToken());
  }
  registerUser(body: any) {
    return this.httpClient.post(this.baseUrl + 'register', body);
  }
  loginUser(body: any) {
    return this.httpClient.post(this.baseUrl + 'login', body);
  }
  getUserById(id: number) {
    return this.httpClient.get(this.baseUrl + 'user/' + id, this.getToken());
  }
  getExercicesByName(name: string) {
    return this.httpClient.get(
      this.baseUrl + 'exercise/getExercisesByName/' + name
    );
  }

  filterEjercices(dificultad: string, categoria: string, arrMusculos: any) {
    if (
      arrMusculos.length >= 3 &&
      dificultad.length !== 0 &&
      !categoria.length
    ) {
      return this.httpClient.get(
        this.baseUrl +
          `exercises/filters?dificultad=${dificultad}&Musculos=${arrMusculos}`,
        this.getToken()
      );
    } else if (
      arrMusculos.length >= 3 &&
      categoria.length !== 0 &&
      !dificultad.length
    ) {
      return this.httpClient.get(
        this.baseUrl +
          `exercises/filters?categoria=${categoria}&Musculos=${arrMusculos}`,
        this.getToken()
      );
    } else if (
      arrMusculos.length >= 3 &&
      !categoria.length &&
      !dificultad.length
    ) {
      return this.httpClient.get(
        this.baseUrl + `exercises/filters?Musculos=${arrMusculos}`,
        this.getToken()
      );
    } else if (
      categoria.length !== 0 &&
      dificultad.length !== 0 &&
      arrMusculos.length < 3
    ) {
      return this.httpClient.get(
        this.baseUrl +
          `exercises/filters?dificultad=${dificultad}&categoria=${categoria}`,
        this.getToken()
      );
    } else if (
      dificultad.length !== 0 &&
      !categoria.length &&
      arrMusculos.length < 3
    ) {
      return this.httpClient.get(
        this.baseUrl + `exercises/filters?dificultad=${dificultad}`,
        this.getToken()
      );
    } else if (
      categoria.length !== 0 &&
      !dificultad.length &&
      arrMusculos.length < 3
    ) {
      return this.httpClient.get(
        this.baseUrl + `exercises/filters?categoria=${categoria}`,
        this.getToken()
      );
    } else
      return this.httpClient.get(
        this.baseUrl +
          `exercises/filters?dificultad=${dificultad}&categoria=${categoria}&Musculos=${arrMusculos}`,
        this.getToken()
      );
  }
  getMusclesById(id: number) {
    return this.httpClient.get(
      this.baseUrl + 'muscle/getMuscleByID/' + id,
      this.getToken()
    );
  }
  getEjercices() {
    return this.httpClient.get(this.baseUrl + 'exercise', this.getToken());
  }
  getEjercicesLength() {
    return this.httpClient.get(
      this.baseUrl + 'exercisesLength',
      this.getToken()
    );
  }
  getEjercicesPaginate(currentPage: number, itemsPerPage: number) {
    return this.httpClient.get(
      `${this.baseUrl}exercise?currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&tabla=ejercicios`,
      this.getToken()
    );
  }
  getExercicebyID(id: any) {
    return this.httpClient.get(
      this.baseUrl + 'exercise/getExerciseByID/' + id,
      this.getToken()
    );
  }
}
