import { ApipeticionesService } from './../../../servicios/apipeticiones.service';
import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit, OnChanges{
  @Input() currentPage: any;
  @Output() ejercicesLengthEmit = new EventEmitter<any>()
  @Output() ejercices= new EventEmitter<any>()
  @Input() allEjercices:any;
  @Input() filter?:boolean;
  itemsPerPage:number= 8; 
  ejercicesLength?: any;
  pages:any; 
  items:any = []
  constructor(private apipeticionesService: ApipeticionesService){

  }
  
  ngOnInit(): void {
    this.apipeticionesService.getEjercicesLength().subscribe((data) => {
      this.ejercicesLength=data
      this.ejercicesLengthEmit.emit(this.ejercicesLength)
      this.pages = Math.ceil(this.ejercicesLength/this.itemsPerPage);
      for (let index = 1; index <= this.pages; index++) {
      this.items.push(index)
    }
    });
  }
  ngOnChanges(): void {
    if(this.currentPage!==1){
      setTimeout(() => {
      window.scrollTo(0, 500);
    }, 0);
    }
    
  }
  handleItem(currentPage:number){
    this.apipeticionesService.getEjercicesPaginate(currentPage,this.itemsPerPage).subscribe((data) => {
      this.ejercices.emit(data);
      this.currentPage = currentPage
    });
  }
  handleNext(){
    this.currentPage++
    this.apipeticionesService.getEjercicesPaginate(this.currentPage,this.itemsPerPage).subscribe((data) => {
      this.ejercices.emit(data);
    });
    
  }
  handlePrevious(){
    this.currentPage--
    this.apipeticionesService.getEjercicesPaginate(this.currentPage,this.itemsPerPage).subscribe((data) => {
      this.ejercices.emit(data);
    });
  }
}
