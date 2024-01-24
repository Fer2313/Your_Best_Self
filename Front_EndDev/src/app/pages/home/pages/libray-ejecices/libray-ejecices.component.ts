import { ApipeticionesService } from './../../../../servicios/apipeticiones.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-libray-ejecices',
  templateUrl: './libray-ejecices.component.html',
  styleUrls: ['./libray-ejecices.component.css'],
})
export class LibrayEjecicesComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 8;
  ejercices: any = [];
  exerciceId?: any;
  booleanModel: boolean = false;
  animar: boolean = false;
  ejercicesLength: any = []
    
  animarFunction() {
    this.animar = true;
  } 
  handleFilter(event:any){
    this.ejercices = event;
  }
  recivedEjercicesLength(event:any){
    this.ejercicesLength = event
  }
  recibedAnimar(event:boolean){
   this.animar = event;
  }
  recivedmensage(event: any) {
    this.exerciceId = event;
  }
  recivedBoolean(event: boolean) {
    this.booleanModel = event;
  }
  recivedBooleanM(event: boolean) {
    this.booleanModel = event;
  }
  recivedEjercices(event: any) {
    this.ejercices = event;
  }

  constructor(private apipeticionesService: ApipeticionesService) {}

  ngOnInit(): void {
    this.apipeticionesService
      .getEjercicesPaginate(this.currentPage, this.itemsPerPage)
      .subscribe((data) => {
        this.ejercices = data;
      });
  }
}
