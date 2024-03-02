import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dificulty-r',
  templateUrl: './dificulty-r.component.html',
  styleUrls: ['./dificulty-r.component.css']
})
export class DificultyRComponent {
@Input() dificulty: number = 0
}
