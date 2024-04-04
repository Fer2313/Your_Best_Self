import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  verify: string | boolean = "loading"
  constructor(private route: ActivatedRoute, private router:Router ,private apiservice:ApipeticionesService) {}
  handleExit(){
    this.router.navigate(['/'])
  }
  ngOnInit(): void {
    const base64Hash:any = this.route.snapshot.paramMap.get('email');
    const id:any = this.route.snapshot.paramMap.get('id');
    const hashedEmail = atob(base64Hash);
    const body = {
      hashEmail: hashedEmail,
      id: parseInt(id)
    }
    this.apiservice.VerifyUser(body).subscribe(()=>{
       this.verify = true
    }, ()=>{
      this.verify = false
    })
  }
}
