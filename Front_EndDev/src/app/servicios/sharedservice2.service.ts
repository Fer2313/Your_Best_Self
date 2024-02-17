import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Sharedservice2Service {
  private dataSubject = new BehaviorSubject<any>([]);
  public data$ = this.dataSubject.asObservable();

  updateData(newData: any) {
    this.dataSubject.next(newData);
  }
}
