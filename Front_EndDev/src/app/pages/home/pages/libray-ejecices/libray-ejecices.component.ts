import { Sharedservice2Service } from 'src/app/servicios/sharedservice2.service';
import { ApipeticionesService } from './../../../../servicios/apipeticiones.service';
import {
  Component,
  OnInit,
} from '@angular/core';
import { IdexercicesService } from 'src/app/servicios/idexercices.service';
import { PaginadoFrontService } from 'src/app/servicios/paginado-front.service';


@Component({
  selector: 'app-libray-ejecices',
  templateUrl: './libray-ejecices.component.html',
  styleUrls: ['./libray-ejecices.component.css'],
})
export class LibrayEjecicesComponent implements OnInit{
  ejercices: any = [];
  search: boolean= false;
  currentPage: number = 1;
  itemsPerPage: number = 8;
  exerciceId?: any;
  booleanModel: boolean = false;
  animar: boolean = false;
  filter: boolean = false;
  ejercicesLength: any;

  animarFunction() {
    this.animar = true;
  }
  desactivateSearch(){
    this.sharedService.updateData([])
    this.apipeticionesService
      .getEjercicesPaginate(this.currentPage, this.itemsPerPage)
      .subscribe((data) => {
        this.ejercices = data;
      });
      this.search= false
  }
  recibedCurrentPage(event: number) {
    this.currentPage = event;
    console.log(this.currentPage);
  }
  ejercicesFilterRecived(event: any) {
    this.ejercices = event;
  }
  handleFilter(event: any) {
    this.ejercices = event;
  }
  booleanFilter(event: boolean) {
    this.filter = event;
  }
  recivedEjercicesLength(event: any) {
    this.ejercicesLength = event;
  }
  recibedAnimar(event: boolean) {
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
    this.exerciceidshared.updateData(0)
  }
  recivedEjercices(event: any) {
    this.ejercices = event;
  }

  constructor(
    private Paginado: PaginadoFrontService,
    private apipeticionesService: ApipeticionesService,
    private sharedService: Sharedservice2Service,
    private exerciceidshared: IdexercicesService
  ) {
    this.exerciceidshared.data$.subscribe((data) => {
      const newId = data;
      if (newId.nombre_ejercicios) {
        console.log(newId)
        this.exerciceId = newId;
        this.booleanModel = true
      }
    });
    /* this.sharedService.data$.subscribe((data) => {
      const newData = data;
      if (newData.length) {
        this.search = true;
        this.ejercices = newData;
      }else{
        this.search= false
      }
    }); */
    this.sharedService.data$.subscribe((data:any) => {
      const newData = data;
        if (newData.length) {
         this.ejercices = this.Paginado.paginateFront(newData, this.currentPage, this.itemsPerPage);
         this.search = true;
        }else{
         this.search= false
        }  
    });
  }

  ngOnInit(): void {
    this.sharedService.updateData([])
    this.apipeticionesService
      .getEjercicesPaginate(this.currentPage, this.itemsPerPage)
      .subscribe((data) => {
        this.ejercices = data;
      });
  }

}
