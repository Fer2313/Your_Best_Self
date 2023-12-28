import { Component } from '@angular/core';
export interface CarruselItem {
  id: number;
  imagenUrl: string;
  titulo: string;
  descripcion: string;
}
@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent {
CarruselItems:CarruselItem[] =[
  {
  id:1,
  imagenUrl:"../../../assets/istockphoto-1448292619-612x612 1.png",
  titulo:"Persolaliza tus entrenamientos",
  descripcion:"Diseña y adapta tus entrenamientos a medida, aprovechando todos los ejercicios que tenemos disponibles para ti."
},
{
  id:2,
  imagenUrl:"../../../assets/fit-1868634_1280 1.png",
  titulo:"Entrena con entrenamientos pre-armados",
  descripcion:"Comienza a entrenar con nuestras rutinas predefinidas especialmente diseñadas para ti."
},
{
  id:3,
  imagenUrl:"../../../assets/pngtree-technology-round-dashboard-image_908915 1.png",
  titulo:"Monitorea tu progreso",
  descripcion:"Supervisa tus progresos y logros a través de nuestro dashboard personalizado, diseñado especialmente para ti."
},]
  i : number = 0;
  bolean:boolean=false;
  handleLeft():number{
    if(this.i === 0){
      this.applyAnimationClass(this.bolean=true)
      setTimeout(() => {
        this.applyAnimationClass(this.bolean=false)
      }, 500);
     return this.i = this.CarruselItems.length-1
    }
    this.applyAnimationClass(this.bolean=true)
    setTimeout(() => {
      this.applyAnimationClass(this.bolean=false)
    }, 500);
    return this.i= this.i - 1
  }
  handleRigth():any{
    if(this.i === this.CarruselItems.length-1){
      this.applyAnimationClass(this.bolean=true)
      setTimeout(() => {
        this.applyAnimationClass(this.bolean=false)
      }, 500);
      return this.i = 0
    } 
    this.applyAnimationClass(this.bolean=true)
    setTimeout(() => {
      this.applyAnimationClass(this.bolean=false)
    }, 500);
    
   return this.i= this.i + 1
  }
  applyAnimationClass(boolean: boolean): string {
    console.log(this.bolean)
    return boolean ? 'fade-in-out-animation' : '';
  }
 
  
}
