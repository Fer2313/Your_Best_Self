import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private dataSubject = new BehaviorSubject<number>(1);
  public data$ = this.dataSubject.asObservable();

  updateData(newData: number) {
    this.dataSubject.next(newData);
  }
}
