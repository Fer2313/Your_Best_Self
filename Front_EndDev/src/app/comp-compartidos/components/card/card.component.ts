import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ApipeticionesService } from './../../../../app/servicios/apipeticiones.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent{
  @Input() ejercices: any;
  @Output() sendExercise = new EventEmitter<any>()
  @Output() sendBoolean = new EventEmitter<boolean>()
  constructor(private Apipeticiones: ApipeticionesService){}
  getIdMetod(id:number){
    this.Apipeticiones.getExercicebyID(id).subscribe((data) => {
      this.sendExercise.emit(data);
    });
    this.sendBoolean.emit(true)
  }

}
