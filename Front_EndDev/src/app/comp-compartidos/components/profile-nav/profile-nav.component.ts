import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routesNav, user } from 'src/app/interfaces/perfilInterfaces';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';

@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.css']
})
export class ProfileNavComponent implements OnInit{
  obj : routesNav = {
    profile: true,
    progress: false,
    security: false,
    dashboard: false
  }
  constructor(private apiservice: ApipeticionesService, private router:Router){
    this.currentRoute = this.router.url;
    console.log(this.currentRoute)
    if (this.currentRoute === "/perfil") {
      this.obj = {
        profile: true,
        progress: false,
        security: false,
        dashboard: false
      }
    }
    if (this.currentRoute === "/perfil/progreso") {
      this.obj = {
        profile: false,
        progress: true,
        security: false,
        dashboard: false
      }
    }
    if (this.currentRoute === "/perfil/seguridad") {
      this.obj = {
        profile: false,
        progress: false,
        security: true,
        dashboard: false
      }
      console.log(this.obj)
    }
    if (this.currentRoute === "/perfil/dashboard") {
      this.obj = {
        profile: false,
        progress: false,
        security: false,
        dashboard: true
      }
    }
    
  }
  currentRoute :string= ""
user: user = {
  idUsuario: 0,
    imagen: "",
    nombreUsuario: "",
    rol: ""
}
handleExit(){
 this.router.navigate(["/"])
}
ngOnInit(): void {
  this.apiservice.obtenerUsuario().subscribe((data:any) => {
    console.log(data)
    this.user = data;
  });
}
}
