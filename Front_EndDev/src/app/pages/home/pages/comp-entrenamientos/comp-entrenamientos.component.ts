import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-comp-entrenamientos',
  templateUrl: './comp-entrenamientos.component.html',
  animations: [
    trigger('hiden', [
      state('no', style({ opacity: 0 , display:"none" })),
      state('si', style({ opacity: 1 })),
      transition('no <=> si', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class CompEntrenamientosComponent {
  animar = false;
  toggleAnimacion() {
    this.animar = true;
  }
  toggleAnimacion2() {
    this.animar = false;
  }
}
