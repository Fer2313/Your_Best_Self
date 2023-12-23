import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ApipeticionesService {
 private baseUrl = "http://localhost:3000/exercise";
  constructor(private httpClient: HttpClient) {

   }
   getEjercices(){
    return this.httpClient.get(this.baseUrl);
   }
}
