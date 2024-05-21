import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/perfilInterfaces';
import  calendarItems  from "src/app/pages/perfil/pages/progreso/items"
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';


@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.component.html',
  providers: [],
})
export class ProgresoComponent implements OnInit {
  user: Usuario = {
    id_usuario: 0,
    nombre: '',
    edad: 0,
    peso: 0,
    altura: 0,
    pesoIdeal: 0,
    sexo: 'none',
    email: '',
    contraseña: '',
    rol: 'none',
    verify: 'false',
    imagen_perfil: '',
  };

  
  // Calendar logic
  arrDays:any = []
  months: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  weekdays: string[] = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  actualMonth: number = new Date().getMonth() + 1;
  
  // Current
  currentMonth: number = this.actualMonth;
  currentMonthName: string = this.months[this.currentMonth-1];
  currentYear: number = new Date().getFullYear();
  daysInMonth: number = new Date(this.currentYear, this.currentMonth, 0).getDate();
  firstDayOfMonth: number = new Date(this.currentYear, this.currentMonth - 1, 1).getDay();
  firstDayName: string = this.weekdays[this.firstDayOfMonth];

  // Prev
  previousMonth: number = this.currentMonth - 1;
  previousYear: number = (this.previousMonth === 0) ? this.currentYear - 1 : this.currentYear;
  daysInPreviousMonth: number = new Date(this.previousYear, this.previousMonth, 0).getDate();

  // Next 
  nextMonth: number = this.currentMonth + 1;
  nextYear: number = (this.nextMonth === 13) ? this.currentYear + 1 : this.currentYear;
  daysInNextMonth: number = new Date(this.nextYear, this.nextMonth, 0).getDate();

  prevMonthFunction(){
    if (this.currentMonth === 1) {
      this.currentMonth = 12
      this.currentYear--
      this.nextYear = (this.nextMonth === 13) ? this.currentYear + 1 : this.currentYear;
      this.previousYear = (this.previousMonth === 0) ? this.currentYear - 1 : this.currentYear;
    }else{
      this.currentMonth = this.currentMonth - 1;
    }
    this.previousMonth= this.currentMonth - 1;
    this.nextMonth = this.currentMonth + 1;
    this.daysInMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
    this.firstDayOfMonth = new Date(this.currentYear, this.currentMonth - 1, 1).getDay();
    this.firstDayName = this.weekdays[this.firstDayOfMonth];
    this.currentMonthName = this.months[this.currentMonth-1];
    this.daysInPreviousMonth = new Date(this.previousYear, this.previousMonth, 0).getDate();
    this.arrDays = calendarItems(this.firstDayName, this.arrDays, this.daysInPreviousMonth, this.daysInMonth)
  }




  nextMonthFunction(){
    if (this.currentMonth === 12) {
      this.currentMonth = 1
      this.currentYear++
      this.nextYear = (this.nextMonth === 13) ? this.currentYear + 1 : this.currentYear;
      this.previousYear = (this.previousMonth === 0) ? this.currentYear - 1 : this.currentYear;
    }else{
      this.currentMonth = this.currentMonth + 1
    }
    this.previousMonth= this.currentMonth - 1;
    this.nextMonth = this.currentMonth + 1;
    this.daysInMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
    this.firstDayOfMonth = new Date(this.currentYear, this.currentMonth - 1, 1).getDay();
    this.firstDayName = this.weekdays[this.firstDayOfMonth];
    this.currentMonthName = this.months[this.currentMonth-1];
    this.daysInPreviousMonth = new Date(this.previousYear, this.previousMonth, 0).getDate();
    this.arrDays = calendarItems(this.firstDayName, this.arrDays, this.daysInPreviousMonth, this.daysInMonth)
  }

  constructor(private apiservice: ApipeticionesService) {}

  ngOnInit(): void {
    this.arrDays = calendarItems(this.firstDayName, this.arrDays, this.daysInPreviousMonth, this.daysInMonth)
    this.apiservice.obtenerUsuario().subscribe((data: any) => {
      this.apiservice.getUserById(data.idUsuario).subscribe((data2: any) => {
        this.user = data2;
      });
    });
  }
}
