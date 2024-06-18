import { Training } from 'src/app/interfaces/homeIntefaces';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import calendarItems from 'src/app/pages/perfil/pages/progreso/items';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-calendario-actividades',
  templateUrl: './calendario-actividades.component.html',
  animations: [
    trigger('desplazamiento', [
      state('arriba', style({ height: 0, opacity: 0 })),
      state('abajo', style({ height: 45 })),
      transition('arriba <=> abajo', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class CalendarioActividadesComponent implements OnInit {
  constructor(private apipeticiones: ApipeticionesService) {}
  @Input() traininLog: any;
  @Input() id_usuario: any;
  animar: boolean = false;
  registroEntrenamientos: any;
  // Calendar logic

  arrDays: any = [];
  months: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  weekdays: string[] = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  actualMonth: number = new Date().getMonth() + 1;
  actualYear: number = new Date().getFullYear();
  daySelected: any;
  // Current
  today = new Date();
  currentDay = this.today.getDate();
  currentMonth: number = this.actualMonth;
  currentMonthName: string = this.months[this.currentMonth - 1];
  currentYear: number = new Date().getFullYear();
  daysInMonth: number = new Date(
    this.currentYear,
    this.currentMonth,
    0
  ).getDate();

  firstDayOfMonth: number = new Date(
    this.currentYear,
    this.currentMonth - 1,
    1
  ).getDay();
  firstDayName: string = this.weekdays[this.firstDayOfMonth];

  // Prev
  previousMonth: number = this.currentMonth - 1;
  previousYear: number =
    this.previousMonth === 0 ? this.currentYear - 1 : this.currentYear;
  daysInPreviousMonth: number = new Date(
    this.previousYear,
    this.previousMonth,
    0
  ).getDate();

  // Next
  nextMonth: number = this.currentMonth + 1;
  nextYear: number =
    this.nextMonth === 13 ? this.currentYear + 1 : this.currentYear;
  daysInNextMonth: number = new Date(
    this.nextYear,
    this.nextMonth,
    0
  ).getDate();

  prevMonthFunction() {
    if (this.currentMonth === 1) {
      this.currentMonth = 12;
      this.currentYear--;
      this.nextYear =
        this.nextMonth === 13 ? this.currentYear + 1 : this.currentYear;
      this.previousYear =
        this.previousMonth === 0 ? this.currentYear - 1 : this.currentYear;
    } else {
      this.currentMonth = this.currentMonth - 1;
    }
    this.previousMonth = this.currentMonth - 1;
    this.nextMonth = this.currentMonth + 1;
    this.daysInMonth = new Date(
      this.currentYear,
      this.currentMonth,
      0
    ).getDate();
    this.firstDayOfMonth = new Date(
      this.currentYear,
      this.currentMonth - 1,
      1
    ).getDay();
    this.firstDayName = this.weekdays[this.firstDayOfMonth];
    this.currentMonthName = this.months[this.currentMonth - 1];
    this.daysInPreviousMonth = new Date(
      this.previousYear,
      this.previousMonth,
      0
    ).getDate();
    this.arrDays = calendarItems(
      this.firstDayName,
      this.arrDays,
      this.daysInPreviousMonth,
      this.daysInMonth
    );
  }

  handleSelectDay(item: number) {
    this.registroEntrenamientos.forEach((element: any) => {
      if (
        `${this.currentYear}-${
          this.currentMonth < 10 ? '0' + this.currentMonth : this.currentMonth
        }-${item < 10 ? '0' + item : item}` === element.fecha.slice(0, 10)
      ) {
        this.animar = !this.animar;
        if (this.daySelected !== element) {
          setTimeout(() => {
            this.daySelected = element;
            this.animar = true;
          }, 500);
        }
      }
    });
  }

  quitActivityInfo() {
    this.animar = false;
  }

  nextMonthFunction() {
    if (this.currentMonth === 12) {
      this.currentMonth = 1;
      this.currentYear++;
      this.nextYear =
        this.nextMonth === 13 ? this.currentYear + 1 : this.currentYear;
      this.previousYear =
        this.previousMonth === 0 ? this.currentYear - 1 : this.currentYear;
    } else {
      this.currentMonth = this.currentMonth + 1;
    }
    this.previousMonth = this.currentMonth - 1;
    this.nextMonth = this.currentMonth + 1;
    this.daysInMonth = new Date(
      this.currentYear,
      this.currentMonth,
      0
    ).getDate();
    this.firstDayOfMonth = new Date(
      this.currentYear,
      this.currentMonth - 1,
      1
    ).getDay();
    this.firstDayName = this.weekdays[this.firstDayOfMonth];
    this.currentMonthName = this.months[this.currentMonth - 1];
    this.daysInPreviousMonth = new Date(
      this.previousYear,
      this.previousMonth,
      0
    ).getDate();
    this.arrDays = calendarItems(
      this.firstDayName,
      this.arrDays,
      this.daysInPreviousMonth,
      this.daysInMonth
    );
  }
  getClassCurrentDay(item: number, index: number) {
    const enAño = this.traininLog['fecha'].filter(
      (f: any) => f.slice(0, 4) === this.currentYear.toString()
    );
    const enMes = enAño.length
      ? enAño.filter(
          (f: any) => f.slice(5, 7) === 0 + this.currentMonth.toString()
        )
      : false;
    const isItemInArray = enMes.length
      ? enMes.some((element: any) => parseInt(element.slice(8, 10)) === item)
      : false;
    const inActualMes = this.currentMonth === this.actualMonth;
    const inActualYear = this.currentYear === this.actualYear;
    const inMonth = !(item < 25 && index > 29) && !(item > 25 && index < 10);
    if (item === this.currentDay && inActualMes && inActualYear && inMonth) {
      return 'bg-[#6aaff0] ';
    } else if (isItemInArray && inMonth) {
      return 'bg-red-200';
    } else {
      return 'bg-slate-200';
    }
  }
  getClass(item: number, index: number): string {
    const enAño = this.traininLog['fecha'].filter(
      (f: any) => f.slice(0, 4) === this.currentYear.toString()
    );
    const enMes = enAño.length
      ? enAño.filter(
          (f: any) => f.slice(5, 7) === 0 + this.currentMonth.toString()
        )
      : false;
    const isItemInArray = enMes.length
      ? enMes.some((element: any) => parseInt(element.slice(8, 10)) === item)
      : false;
    const otherMonth = (item > 20 && index <= 15) || (item < 15 && index > 20);
    if (otherMonth) {
      return 'text-[#9FC2F1]';
    } else if (isItemInArray) {
      return 'text-red-800';
    } else {
      return 'text-black';
    }
  }

  ngOnInit(): void {
    this.apipeticiones
      .getTrainingLogById(this.id_usuario)
      .subscribe((data: any) => {
        this.registroEntrenamientos = data;
      });
    this.arrDays = calendarItems(
      this.firstDayName,
      this.arrDays,
      this.daysInPreviousMonth,
      this.daysInMonth
    );
  }
}
