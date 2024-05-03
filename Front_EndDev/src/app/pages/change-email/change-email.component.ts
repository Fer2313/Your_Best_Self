import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
})
export class ChangeEmailComponent implements OnInit {
  changeEmail : string | boolean = "loading"
  constructor(private apiservice: ApipeticionesService, private router: Router, private route: ActivatedRoute){
  }
  handleExit(){
    this.router.navigate(['/'])
  }
ngOnInit(): void {
  const obj = {
    token: this.route.snapshot.paramMap.get('token')
  }
  this.apiservice.changeEmail(obj).subscribe(()=>{
       this.changeEmail = true
  },()=>{
    this.changeEmail = false
  })
}
}
