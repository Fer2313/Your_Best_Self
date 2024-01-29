import { ApipeticionesService } from './../../../servicios/apipeticiones.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { PaginadoFrontService } from 'src/app/servicios/paginado-front.service';
import { SharedService } from 'src/app/servicios/shared.service';

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
  @Output() filter = new EventEmitter<boolean>();
  @Output() ejercicesLength = new EventEmitter<any>();
  @Output() currentPageEvent = new EventEmitter<number>();
  @Input() currentPage: number = 1;
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
  updateValue(num:number) {
    this.sharedService.updateData(num);
  }
  handleSubmit() {
    if (
      this.objSummit.categoria.length ||
      this.objSummit.dificultad.length ||
      this.objSummit.arrMusculos.length
    ) {
      const Musculos = `[${this.objSummit.arrMusculos}]`;

      this.ApipeticionesService.filterEjercices(
        this.objSummit.dificultad,
        this.objSummit.categoria,
        Musculos
      ).subscribe(
        (data) => {
          const ejercicesL = data;
          this.ejercicesLength.emit(ejercicesL);
          this.currentPageEvent.emit(1);
          this.updateValue(1)
          this.ejercicios.emit(
            this.Paginado.paginateFront(data, 1, 8)
          );
          this.filter.emit(true);
        },
        (error) => {
          console.log(error);
          window.alert(error.error);
        }
      );
    } else {
      this.filter.emit(false);
      this.currentPageEvent.emit(1);
      this.ApipeticionesService.getEjercicesPaginate(
        1,
        8
      ).subscribe((data) => {
        this.ejercicios.emit(data);
      });
    }
  }
  onDesactivate(string: string) {
    if (this.objSummit.categoria === string) {
      this.objSummit.categoria = '';
    } else if (this.objSummit.dificultad === string) {
      this.objSummit.dificultad = '';
    }
  }
  handleFilter(id: number) {
    if (this.obj['checkboxValue' + id] === true) {
      this.objSummit.arrMusculos.push(id);
    } else if (this.obj['checkboxValue' + id] === false) {
      this.objSummit.arrMusculos = this.objSummit.arrMusculos.filter(
        (number: number) => number !== id
      );
    }
  }

  muscles: any;
  constructor(
    private ApipeticionesService: ApipeticionesService,
    private Paginado: PaginadoFrontService,
    private sharedService: SharedService
  ) {}
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
