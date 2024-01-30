import { ApipeticionesService } from './../../../servicios/apipeticiones.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { IdexercicesService } from 'src/app/servicios/idexercices.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger('hiden', [
      state('Falso', style({ opacity: 0, display: 'none' })),
      state('Verdadero', style({ opacity: 1 })),
      transition('Falso <=> Verdadero', animate('0.2s ease-in-out')),
    ]),
  ],
})
export class ModalComponent {
  @Output() sendBooleanM = new EventEmitter<boolean>();
  @Input() BooleanM?: boolean;
  @Input() exerciceId?: any;
  sendEventM() {
    this.sendBooleanM.emit(false);
  }
}
