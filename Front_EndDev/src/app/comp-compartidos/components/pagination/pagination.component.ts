import { ApipeticionesService } from './../../../servicios/apipeticiones.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit{
  @Input() currentPage: any;
  @Output() ejercices= new EventEmitter<any>()
  @Input() allEjercices:any;
  itemsPerPage:number= 8; 
  ejercicesLength?: any;
  pages:any; 
  items:any = []
  constructor(private apipeticionesService: ApipeticionesService){

  }
  ngOnInit(): void {
    this.apipeticionesService.getEjercicesLength().subscribe((data) => {
      this.ejercicesLength=data
      this.pages = Math.ceil(this.ejercicesLength/this.itemsPerPage);
      for (let index = 1; index <= this.pages; index++) {
      this.items.push(index)
    }
    });
    
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
