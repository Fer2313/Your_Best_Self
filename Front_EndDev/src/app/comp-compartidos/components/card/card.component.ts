import { Component, OnInit } from '@angular/core';
import { ApipeticionesService } from './../../../../app/servicios/apipeticiones.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
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
