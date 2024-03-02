import { Training } from 'src/app/interfaces/homeIntefaces';
import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pcontent',
  templateUrl: './pcontent.component.html',
  styleUrls: ['./pcontent.component.css'],
  viewProviders: [provideIcons({ heroUsers })]
})
export class PContentComponent {
  constructor(private router:Router){

  }
 @Input() Trainings : Training [] = [];
 handleEntrenamiento(id:number){
   this.router.navigate(["home/entrenamiento",id])
 }
}
