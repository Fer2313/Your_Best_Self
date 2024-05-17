import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';
import { Sharedservice2Service } from 'src/app/servicios/sharedservice2.service';
import { IdexercicesService } from 'src/app/servicios/idexercices.service';
import { Router } from '@angular/router';
import { AthenticationService } from 'src/app/servicios/athentication.service';
@Component({
  selector: 'app-nav-bar2',
  templateUrl: './nav-bar2.component.html',
  animations: [
    trigger('desplazamiento', [
      state('izquierda', style({ width: '0px' })),
      state('derecha', style({ width: '200px', padding: '5px' })),
      transition('izquierda <=> derecha', animate('0.5s ease-in-out')),
    ]),
    trigger('desplazamiento2', [
      state('arriba', style({ height: '0px', border: '0px', opacity: 0 })),
      state('abajo', style({ height: '90px' })),
      transition('arriba <=> abajo', animate('0.5s ease-in-out')),
    ]),
    trigger('hiden', [
      state('no', style({ opacity: 0, display: 'none' })),
      state('si', style({ opacity: 1 })),
      transition('no <=> si', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class NavBar2Component implements OnInit {
  constructor(
    private router: Router,
    private apiService: ApipeticionesService,
    private sharedService: Sharedservice2Service,
    private auth:AthenticationService,
    private exerciceidshared: IdexercicesService
  ) {
    this.currentRoute = this.router.url;
    if (this.currentRoute === '/home') {
      this.animar4 = false
      this.obj = {
        entrenamientos: true,
        entrenamientosComunidad: false,
        misEntrenamientos: false,
        bibliotecaEjercicios: false,
      };
    }
    if (this.currentRoute === '/home/comp_entrenamientos') {
      this.animar4 = false
      this.obj = {
        entrenamientos: false,
        entrenamientosComunidad: true,
        misEntrenamientos: false,
        bibliotecaEjercicios: false,
      };
    }
    if (this.currentRoute === '/home/pers_entrenamientos') {
      this.animar4 = false
      this.obj = {
        entrenamientos: false,
        entrenamientosComunidad: false,
        misEntrenamientos: true,
        bibliotecaEjercicios: false,
      };
    }
    if (this.currentRoute === '/home/library_Ejercices') {
      this.animar4 = false
      this.obj = {
        entrenamientos: false,
        entrenamientosComunidad: false,
        misEntrenamientos: false,
        bibliotecaEjercicios: true,
      };
    }
  
  }
  user: any ;
  animar = false;
  animar2 = false;
  animar3 = false;
  animar4 = false;
  ejercicios: any = [];
  imputValue = '';
  currentRoute = '';
  obj: any = {
    entrenamientos: false,
    entrenamientosComunidad: false,
    misEntrenamientos: false,
    bibliotecaEjercicios: false,
  };
  
  activateModal(id:number){
    this.exerciceidshared.updateData(id)
  }
  handleSearch(name: string) {
    if (this.obj.bibliotecaEjercicios) {
      this.apiService.getExercicesByName(name).subscribe((data)=>{
       this.sharedService.updateData(data)
       this.animar = false
       this.animar4= false  
      })
    }
  }
  getExercices(name: string) {
    if (this.obj.bibliotecaEjercicios){
    if (name === '') {
      this.animar4 = false;
    }else{
       this.apiService.getExercicesByName(name).subscribe((data: any) => {
      this.ejercicios = data.slice(0,5);
      this.animar4 = true;
    },()=>{
     this.ejercicios = [{
      nombre_ejercicios:"No se encontraron ejercicios"
     }]
    });
    }
  }
   
  }
  changeSection(input: any) {
    if (input === 'entrenamientos') {
      this.obj = {
        entrenamientos: true,
        entrenamientosComunidad: false,
        misEntrenamientos: false,
        bibliotecaEjercicios: false,
      };
    }
    if (input === 'entrenamientosComunidad') {
      this.obj = {
        entrenamientos: false,
        entrenamientosComunidad: true,
        misEntrenamientos: false,
        bibliotecaEjercicios: false,
      };
    }
    if (input === 'misEntrenamientos') {
      this.obj = {
        entrenamientos: false,
        entrenamientosComunidad: false,
        misEntrenamientos: true,
        bibliotecaEjercicios: false,
      };
    }
    if (input === 'bibliotecaEjercicios') {
      this.obj = {
        entrenamientos: false,
        entrenamientosComunidad: false,
        misEntrenamientos: false,
        bibliotecaEjercicios: true,
      };
    }
  }
  toggleAnimacion() {
    this.animar = !this.animar;
    if (this.ejercicios.length && this.imputValue !== '') {
      this.animar4 = !this.animar4;
    }
  }
  toggleAnimacion2() {
    this.animar2 = !this.animar2;
  }
  toggleAnimacion3() {
    this.animar3 = !this.animar3;
  }
  cerrarSesion() {
    this.auth.logout()
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    this.apiService.obtenerUsuario().subscribe((data:any) => {
      this.user = data;
    },(err)=>{
      if(err){
        this.cerrarSesion()
      }
    });
  }
}
