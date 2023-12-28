import { Component } from '@angular/core';

interface ejercicios {
  nombre:string,
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  arr : ejercicios[] = [
    {
        nombre:"sadas",
    },
    {
        nombre:"sadas1",
    },
    {
        nombre:"sadas2",
    },
    {
        nombre:"sadas3",
    },
    {
        nombre:"sadas4",
    },
    {
        nombre:"sadas5",
    },
    {
        nombre:"sadas6",
    },
    {
        nombre:"sadas7",
    }
]
}
