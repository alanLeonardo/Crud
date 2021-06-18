import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../api/EmpleadoService';


@Component({
  selector: 'ver-empleado',
  templateUrl: './verEmpleado.html'
})


export class VerEmpleado implements OnInit {
  
    empleados: any;
    currentEmpleados = null;
    currentIndex = -1;
    title = '';
  
    constructor(private empleadoService: EmpleadoService) { }
  
    ngOnInit(): void {
      this.retrieveEmpleados();
    }
  
    retrieveEmpleados(): void {
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
  
    refreshList(): void {
      this.retrieveEmpleados();
      this.currentEmpleados = null;
      this.currentIndex = -1;
    }
  
    setEmpleado(empleado, index): void {
      this.currentEmpleados = empleado;
      this.currentIndex = index;
    }
  
    removeAllTutorials(): void {
      this.currentEmpleados.deleteAll()
        .subscribe(
          response => {
            console.log(response);
            this.retrieveEmpleados();
          },
          error => {
            console.log(error);
          });
    }

  }
