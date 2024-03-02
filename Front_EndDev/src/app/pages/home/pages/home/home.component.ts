import { Component, OnInit } from '@angular/core';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';
import { Training } from 'src/app/interfaces/homeIntefaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    constructor(private apiService:ApipeticionesService){

    }
  trainings : Training [] = []

ngOnInit(): void {
    this.apiService.getTrainings().subscribe((data : any)=>{
       this.trainings = data
    })
}

}
