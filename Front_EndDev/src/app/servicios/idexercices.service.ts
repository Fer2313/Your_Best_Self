import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApipeticionesService } from './apipeticiones.service';

@Injectable({
  providedIn: 'root',
})
export class IdexercicesService {
  private dataSubject = new BehaviorSubject<any>({});
  public data$ = this.dataSubject.asObservable();
  updateData(id: any) {
    if(id === 0){
      this.dataSubject.next({});
    }
    this.apiPeticiones.getExercicebyID(id).subscribe((data) => {
      this.dataSubject.next(data);
    });
  }
  constructor(private apiPeticiones: ApipeticionesService) {}
}
