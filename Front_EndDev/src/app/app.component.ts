import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ApipeticionesService } from './servicios/apipeticiones.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'your_best_self';
  constructor(private auth:AuthService, private apiservice: ApipeticionesService, private router: Router){

  }
  
  ngOnInit(): void {
    const token= localStorage.getItem("token")
    this.auth.isAuthenticated$.subscribe(isAuth=>{
      if(isAuth && !token){
        this.auth.user$.subscribe(data=>{
       this.apiservice.loginUser(data).subscribe((data:any)=>{
        localStorage.setItem("token",data.token['token'])
        this.router.navigate([data.redirect]);
      })
        })
      }
    })
  }
}
