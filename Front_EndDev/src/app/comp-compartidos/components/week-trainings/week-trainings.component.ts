import { Component, Input, OnInit } from '@angular/core';
import { TrainingLogService } from 'src/app/servicios/training-log.service';

@Component({
  selector: 'app-week-trainings',
  templateUrl: './week-trainings.component.html',
})
export class WeekTrainingsComponent implements OnInit {
  @Input() id: number = 0;
  constructor(private trainingLogService: TrainingLogService) {}
  weektrainings: any;
 
  async ngOnInit() {
    this.weektrainings = await this.trainingLogService.getWeekTrainnings(
      this.id
    );
    console.log(this.weektrainings)
  }
}
