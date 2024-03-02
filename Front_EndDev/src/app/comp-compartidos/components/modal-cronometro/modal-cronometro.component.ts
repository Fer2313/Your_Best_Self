import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Ejercicio } from 'src/app/interfaces/homeIntefaces';


@Component({
  selector: 'app-modal-cronometro',
  templateUrl: './modal-cronometro.component.html',
  styleUrls: ['./modal-cronometro.component.css'],
  animations: [
    trigger('hiden', [
      state('no', style({ opacity: 0, display: 'none' })),
      state('si', style({ opacity: 1 })),
      transition('no <=> si', animate('0.5s ease-in-out')),
    ]),
  ]
})
export class ModalCronometroComponent implements OnInit, OnDestroy {
   @Input() ejercicio: Ejercicio = {
    Id_ejercicios: 0,
    nombre_ejercicios: '',
    descripcion: '',
    video: '',
    imagen: '',
    categoria: '',
    dificultad: '',
    series: null,
    repeticiones: null,
    tiempo: 0,
    lado: null,
  };
  @Output() start = new EventEmitter <boolean>()
  @Output() changeBooleanModal= new EventEmitter<boolean>()
   @Output() iniciarIsTime = new EventEmitter<boolean>() 
  @Input() modal_temporizador: boolean = false;
  @Input() tiempo?: any;
  alertBoolean: boolean = false;
  Temporizador: any;
  pausaBoolean: boolean = false;
  constructor() {
  }
  handleAlert(){
    this.pausaBoolean = true
    if (this.pausaBoolean) {
      this.detenerTemporizador()
    }
    this.alertBoolean = true;
  }
  recivedBoolean(event:boolean){
    this.alertBoolean = event
  }
  handlePausa(){
    this.pausaBoolean = this.pausaBoolean ? false : true
    if (this.pausaBoolean === true) {
      this.detenerTemporizador()
    }else{
      this.iniciarTemporizador()
    }
  }
  handleExit(event: boolean){
    this.start.emit(event) 
  }
  handleOmitir(){
    this.detenerTemporizador();
    this.modal_temporizador = false;
    this.changeBooleanModal.emit(false)
  }
  ngOnInit(): void {
    this.iniciarTemporizador();
  }

  ngOnDestroy(): void {
    this.detenerTemporizador();
    this.iniciarIsTime.emit(true)
  }

  iniciarTemporizador(): void {
    this.Temporizador = setInterval(() => {
      if (this.tiempo > 0) {
        this.tiempo--;
      } else {
        this.detenerTemporizador();
        this.modal_temporizador = false;
        this.changeBooleanModal.emit(false)
        // Puedes agregar acciones adicionales cuando el temporizador llega a cero
      }
    }, 1000);
  }

  detenerTemporizador(): void {
    clearInterval(this.Temporizador);
  }

  reiniciarTemporizador(): void {
    this.detenerTemporizador();
    this.tiempo = this.tiempo;
    this.iniciarTemporizador();
  }
}
