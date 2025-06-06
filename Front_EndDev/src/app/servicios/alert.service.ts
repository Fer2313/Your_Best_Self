import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}
  alert(options: SweetAlertOptions) {
    Swal.fire(options);
}
}
