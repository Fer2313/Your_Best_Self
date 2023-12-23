import { ApipeticionesService } from './../../../../servicios/apipeticiones.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-libray-ejecices',
  templateUrl: './libray-ejecices.component.html',
  styleUrls: ['./libray-ejecices.component.css']
})
export class LibrayEjecicesComponent implements OnInit{
 
  ejercices: any = []

  constructor(private apipeticionesService : ApipeticionesService){

  }
 
  ngOnInit(): void {
    this.apipeticionesService.getEjercices().subscribe(data=>{
      console.log(data)
      this.ejercices = data
    })
  }

 
   
}
