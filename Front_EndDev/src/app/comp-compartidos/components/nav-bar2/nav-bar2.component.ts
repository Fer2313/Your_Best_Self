import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';


@Component({
  selector: 'app-nav-bar2',
  templateUrl: './nav-bar2.component.html',
  styleUrls: ['./nav-bar2.component.css'],
  animations: [
    trigger('desplazamiento', [
      state('izquierda', style({ width: '0px'})),
      state('derecha', style({ width: '200px', padding:"5px"})),
      transition('izquierda <=> derecha', animate('0.5s ease-in-out')),
    ]),
    trigger('desplazamiento2', [
      state('arriba', style({ height: '0px', border: '0px', opacity: 0 })),
      state('abajo', style({ height: '65px' })),
      transition('arriba <=> abajo', animate('0.5s ease-in-out')),
    ]),
    trigger('hiden', [
      state('no', style({ opacity: 0 , display:"none" })),
      state('si', style({ opacity: 1 })),
      transition('no <=> si', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class NavBar2Component {
  animar = false;
  animar2 = false;
  animar3 = false;
  imputValue = "";
  currentRoute = "";
  obj: any = {
     entrenamientos: false,
     entrenamientosComunidad: false,
     misEntrenamientos: false,
     bibliotecaEjercicios: false
  }
  constructor(private router: Router ){
    this.currentRoute = this.router.url;
    console.log('Ruta actual:', this.currentRoute);
    if (this.currentRoute==="/home") {
      this.obj = {
        entrenamientos: true,
        entrenamientosComunidad: false,
        misEntrenamientos: false,
        bibliotecaEjercicios: false
     }
    }
    if (this.currentRoute==="/home/comp_entrenamientos") {
      this.obj = {
        entrenamientos: false,
        entrenamientosComunidad: true,
        misEntrenamientos: false,
        bibliotecaEjercicios: false
     }
    }
    if (this.currentRoute==="/home/pers_entrenamientos") {
      this.obj = {
        entrenamientos: false,
        entrenamientosComunidad: false,
        misEntrenamientos: true,
        bibliotecaEjercicios: false
     }
    }
    if (this.currentRoute==="/home/library_Ejercices") {
      this.obj = {
        entrenamientos: false,
        entrenamientosComunidad: false,
        misEntrenamientos: false,
        bibliotecaEjercicios: true
     }
    }
  }
  handleSearch(){
   if(this.obj.bibliotecaEjercicios){
       
   }
  }
  getExercices(){
    
  }
  changeSection(input:any){
  if(input === "entrenamientos"){
    this.obj = {
      entrenamientos: true,
      entrenamientosComunidad: false,
      misEntrenamientos: false,
      bibliotecaEjercicios: false
   }
  }
  if(input === "entrenamientosComunidad"){
    this.obj = {
      entrenamientos: false,
      entrenamientosComunidad: true,
      misEntrenamientos: false,
      bibliotecaEjercicios: false
   }
  }
  if(input === "misEntrenamientos"){
    this.obj = {
      entrenamientos: false,
      entrenamientosComunidad: false,
      misEntrenamientos: true,
      bibliotecaEjercicios: false
   }
  }
  if(input === "bibliotecaEjercicios"){   
    this.obj = {
      entrenamientos: false,
      entrenamientosComunidad: false,
      misEntrenamientos: false,
      bibliotecaEjercicios: true
   }
   console.log(this.obj)
  }
  }
  toggleAnimacion() {
    this.animar = !this.animar;
  }
  toggleAnimacion2() {
    this.animar2 = !this.animar2;
  }
  toggleAnimacion3() {
    this.animar3 = !this.animar3;
    console.log(this.animar3);
  }

}