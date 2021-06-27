import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../api/EmpleadoService';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'add-empleado',
    templateUrl: './addEmpleado.html',
    styleUrls: ['./addEmpleado.css']
  })
  
export class AddEmpleadoComponent implements OnInit {

  empleadoForm: FormGroup;
  submitted = false;

  constructor(private empleadoService: EmpleadoService,public fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

  this.empleadoForm = this.fb.group({
    nombreYApellido: [''],
    email: [''],
    dni: [0],
    fechaDeNacimiento: [''],
    sueldo: [0]
  });
  
  }

  addEmpleado(): void {

    this.empleadoService.create(this.empleadoForm.getRawValue())
      .subscribe(
        response => {
          response;
          console.log(response);
          this.volver();
        },
        error => {
          console.log(error);
        });
       
  }

  volver() {
    this.router.navigate(['/home']);
  }
 
  onSubmit() {
    this.submitted = true;
    this.addEmpleado();    
  }

}
