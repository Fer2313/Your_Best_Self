import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
@Component({
  selector: 'app-nav-bar2',
  templateUrl: './nav-bar2.component.html',
  styleUrls: ['./nav-bar2.component.css'],
  animations: [
    trigger('desplazamiento', [
      state('izquierda', style({ width: '0px' })),
      state('derecha', style({ width: '200px' })),
      transition('izquierda <=> derecha', animate('0.5s ease-in-out')),
    ]),
    trigger('desplazamiento2', [
      state('arriba', style({ height: '0px', border: '0px', opacity: 0 })),
      state('abajo', style({ height: '80px' })),
      transition('arriba <=> abajo', animate('0.5s ease-in-out')),
    ]),
    trigger('hiden', [
      state('no', style({ opacity: 0 , display:"none" })),
      state('si', style({ opacity: 1 })),
      transition('no <=> si', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class NavBar2Component {
  animar = false;
  animar2 = false;
  animar3 = false;
  toggleAnimacion() {
    this.animar = !this.animar;
  }
  toggleAnimacion2() {
    this.animar2 = !this.animar2;
  }
  toggleAnimacion3() {
    this.animar3 = !this.animar3;
    console.log(this.animar3);
  }
}
