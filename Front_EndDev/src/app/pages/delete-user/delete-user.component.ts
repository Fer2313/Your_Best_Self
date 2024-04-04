import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit{
  eliminatedUser : string | boolean = "loading"
constructor(private apiservice: ApipeticionesService,private route: ActivatedRoute,private router: Router){}
handleExit(){
  this.router.navigate(['/'])
}
ngOnInit(): void {
 const token : any= this.route.snapshot.paramMap.get('token')
  this.apiservice.deleteUser(token).subscribe(()=>{
    localStorage.removeItem('token');
    this.eliminatedUser = true
  },()=>{
    this.eliminatedUser = false
  })

  
}
}
