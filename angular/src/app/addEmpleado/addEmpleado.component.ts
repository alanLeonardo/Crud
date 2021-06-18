import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../api/EmpleadoService';


@Component({
    selector: 'add-empleado-card',
    templateUrl: './addEmpleado.html',
    styleUrls: ['./addEmpleado.css']
  })
  
export class AddEmpleadoComponent implements OnInit {
  empleado = {
    nombreYApellido: '',
    email: '',
    dni: 0,
    fechaDeNacimiento: '',
    saldo: 0
  };
  enviar = false;

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
  }

  addEmpleado(): void {
    const data = {
      nombreYApellido: this.empleado.nombreYApellido,
      email: this.empleado.email,
      dni: this.empleado.dni,
      fechaDeNacimiento: this.empleado.fechaDeNacimiento,
      saldo: this.empleado.saldo
    };

    this.empleadoService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.enviar = true;
        },
        error => {
          console.log(error);
        });
  }

  newEmpleado(): void {
    this.enviar = false;
    this.empleado = {
      nombreYApellido: '',
      email: '',
      dni: 0,
      fechaDeNacimiento: '',
      saldo: 0
    };
  }

}
