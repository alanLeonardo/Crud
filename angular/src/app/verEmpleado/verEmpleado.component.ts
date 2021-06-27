import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../api/EmpleadoService';
import { Router } from '@angular/router';

@Component({
  selector: 'ver-empleado',
  templateUrl: './verEmpleado.html'
})


export class VerEmpleadoComponent implements OnInit {

  empleados: any;
  currentEmpleados = null;
  currentIndex = -1;
  title = '';

  constructor(private empleadoService: EmpleadoService, private router: Router) { }

  ngOnInit(): void {
    this.listarEmpleados();
  }

  listarEmpleados(): void {
    this.empleadoService.getAll()
      .subscribe(
        data => {
          this.empleados = data.data;
          console.log(data.data);
        },
        error => {
          console.log(error);
        });
  }

  eliminarEmpleado(id: number) {
    this.empleadoService.delete(id)
      .subscribe(
        data => {
          console.log(data);
          this.listarEmpleados();
        },
        error => console.log(error));
  }

  agregarEmpleado() {
    this.router.navigate(['/add']);
  }

  modificarEmpleado(empleado) {
    this.router.navigate(['update',empleado.id]);
  }


}
