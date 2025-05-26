import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
@Output() alertM  = new EventEmitter<boolean>()
@Output() start = new EventEmitter<boolean>()
 @Input() ok : boolean = false
 @Input() title : string = ""
 @Input() descripcion : string = ""
 handleClose(){
  this.alertM.emit(false)
 }
 handleExit(){
  this.start.emit(false)
 }
 }
