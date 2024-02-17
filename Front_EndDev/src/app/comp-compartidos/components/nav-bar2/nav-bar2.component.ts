import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Router } from '@angular/router';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';
import { AuthService } from '@auth0/auth0-angular';
import { AthenticationService } from 'src/app/servicios/athentication.service';
@Component({
  selector: 'app-nav-bar2',
  templateUrl: './nav-bar2.component.html',
  styleUrls: ['./nav-bar2.component.css'],
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
    private apiservice: ApipeticionesService,
    private auth:AthenticationService
  ) {}
  user: any ;
  animar = false;
  animar2 = false;
  animar3 = false;
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
  cerrarSesion() {
    this.auth.logout()
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
    this.apiservice.obtenerUsuario().subscribe((data:any) => {
      console.log(data)
      this.user = data;
    });
  }
}
