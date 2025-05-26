import { Component, Input, OnInit } from '@angular/core';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';
import { TrainingLogService } from 'src/app/servicios/training-log.service';

@Component({
  selector: 'app-racha-user',
  templateUrl: './racha-user.component.html',
 
})
export class RachaUserComponent implements OnInit{
  @Input() id: number= 0
  racha: any = 0
  constructor(private traininlog: TrainingLogService) {}
 ngOnInit(): void {
  this.traininlog.getRacha(this.id).subscribe(
    (racha) => {
      this.racha = racha;
    },
    (err) => {
      console.log(err);
    }
  );
 }
}
