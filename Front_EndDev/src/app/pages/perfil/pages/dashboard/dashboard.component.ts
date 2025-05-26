import { Component, OnInit } from '@angular/core';
import { ApipeticionesService } from 'src/app/servicios/apipeticiones.service';

import Swal from 'sweetalert2';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private apipeticiones: ApipeticionesService) {}
  displayedColumns: string[] = ['id', 'nombre', 'email', 'rol', 'delete'];
  dataSource: any;
  blockUser(id: number) {
    Swal.fire({
      title: 'Estas seguro de que quieres bloquear el usuario?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apipeticiones.deleteUserAdmin(id).subscribe(
          () => {
            Swal.fire('Usuario bloqueado', 'Actualiza para ver los cambios', 'success');
          },
          () => {
            Swal.fire('Ocurrio un error', '', 'error');
          }
        );
      }
    });
  }

  reactivateUser(id: number) {
    Swal.fire({
      title: 'Quieres reactivar el usuario?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.apipeticiones.reactivationUserAdmin(id).subscribe(
          () => {
            Swal.fire('Usuario reactivado', "Actualiza para ver los cambios", "success");
          },
          (error) => {
            Swal.fire('Error al reactivar el usuario', "", "error");
          }
        );
      } 
    });
  }

  ngOnInit(): void {
    this.apipeticiones.getUsers().subscribe(
      (data: any) => {
        this.dataSource = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
