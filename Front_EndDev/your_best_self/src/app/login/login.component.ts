import { Component } from '@angular/core';
interface Usuario{
  email:string,
  password:string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
 user:Usuario={
  email:"",
  password:""
 }
 handleConsole(){
  if(!this.user.email||!this.user.password){
    return window.alert("Faltan datos")
  }
  console.log(this.user)
 }
}
