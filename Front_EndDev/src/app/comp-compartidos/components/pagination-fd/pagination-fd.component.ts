import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PaginadoFrontService } from 'src/app/servicios/paginado-front.service';
import { SharedService } from 'src/app/servicios/shared.service';

@Component({
  selector: 'app-pagination-fd',
  templateUrl: './pagination-fd.component.html',
  styleUrls: ['./pagination-fd.component.css'],
})
export class PaginationFDComponent implements OnChanges {
  @Input() ejercices: any;
  @Input() ejerciciosfiltrados: any;
  @Input() currentPage:any;
  @Output() ejercicios = new EventEmitter<any>();
  ejercicios2: any;
  items: any = [];
  pages?: any;
  itemsPerPage = 8;
  constructor(private Paginado: PaginadoFrontService, private sharedService: SharedService ) {}
  updateValue(num:number) {
    this.sharedService.updateData(num);
  }
  handleNext() {
    let number = this.currentPage+1
    this.updateValue(number);
    this.ejercicios2 = this.Paginado.paginateFront(
      this.ejercices,
      this.currentPage,
      this.itemsPerPage
    );
    this.ejercicios.emit(this.ejercicios2);
  }
  handleItem(currentPage: number) {
   this.updateValue(currentPage);
    this.ejercicios2 = this.Paginado.paginateFront(
      this.ejercices,
      currentPage,
      this.itemsPerPage
    );
    this.ejercicios.emit(this.ejercicios2);
  }
  handlePrevious() {
    let number= this.currentPage-1
    this.updateValue(number);
    this.ejercicios2 = this.Paginado.paginateFront(
        this.ejercices,
        this.currentPage,
        this.itemsPerPage
      )
    this.ejercicios.emit(
      this.ejercicios2
    );
  }
  ngOnChanges(): void {
    if(this.currentPage!==1){
      setTimeout(() => {
      window.scrollTo(0, 500);
    }, 0);
    }
      this.pages = Math.ceil(this.ejercices.length / this.itemsPerPage);
    this.items = [];
    for (let index = 1; index <= this.pages; index++) {
      this.items.push(index);
    }
    this.sharedService.data$.subscribe(data => {
      this.currentPage = data;
    });
  }
}
