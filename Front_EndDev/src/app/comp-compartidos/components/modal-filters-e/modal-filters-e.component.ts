import { ApipeticionesService } from './../../../servicios/apipeticiones.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-modal-filters-e',
  templateUrl: './modal-filters-e.component.html',
  styleUrls: ['./modal-filters-e.component.css'],
  animations: [
    trigger('desplazamiento', [
      state('arriba', style({ opacity: 0, display: 'none' })),
      state('abajo', style({ opacity: 1 })),
      transition('arriba <=> abajo', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class ModalFiltersEComponent implements OnInit {
  @Output() animar = new EventEmitter<boolean>();
  @Output() ejercicios = new EventEmitter<any>();
  @Input() animacion?: boolean;

  obj: any = {};

  objSummit: any = {
    categoria: '',
    dificultad: '',
    arrMusculos: [],
  };

  checkboxEstado: boolean = false;
  checkboxValue: boolean = false;
  setOutModal() {
    this.animar.emit(false);
  }
  handleSubmit() {
    if (this.objSummit.categoria.length||this.objSummit.dificultad.length||this.objSummit.arrMusculos.length) {
       const Musculos = `[${this.objSummit.arrMusculos}]`;
    this.ApipeticionesService.filterEjercices(
      this.objSummit.dificultad,
      this.objSummit.categoria,
      Musculos).subscribe(
      (data) => {
        this.ejercicios.emit(data);
      },
      (error) => {
        console.log(error)
        window.alert(
          error.error
         );
        }
      );
    }else {
     this.ApipeticionesService.getEjercicesPaginate(1,8).subscribe((data)=>{
      this.ejercicios.emit(data);
     })
    }
   
  }
  onDesactivate(string:string){
    if (this.objSummit.categoria === string) {
      this.objSummit.categoria = "";
    }else if (this.objSummit.dificultad === string) {
      this.objSummit.dificultad = ""
    }
  }
  handleFilter(id: number) {
    console.log(this.obj['checkboxValue' + id]);
    if (this.obj['checkboxValue' + id] === true) {
      this.objSummit.arrMusculos.push(id);
    } else if (this.obj['checkboxValue' + id] === false) {
      this.objSummit.arrMusculos = this.objSummit.arrMusculos.filter(
        (number: number) => number !== id
      );
    }
  }

  muscles: any;
  constructor(private ApipeticionesService: ApipeticionesService) {}
  ngOnInit(): void {
    this.ApipeticionesService.getMuscles().subscribe((data) => {
      this.muscles = data;
      for (let index = 0; index <= this.muscles.length; index++) {
        var nombre = `checkboxValue${this.muscles[index].id_musculo}`;
        this.obj[nombre] = false;
      }
    });
  }
}
