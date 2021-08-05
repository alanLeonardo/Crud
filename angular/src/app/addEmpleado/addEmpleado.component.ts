import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../api/EmpleadoService';
import { AreaTrabajoService } from '../api/AreaTrabajoService';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'add-empleado',
  templateUrl: './addEmpleado.html',
  styleUrls: ['./addEmpleado.css']
})

export class AddEmpleadoComponent implements OnInit {

   areasTrabajos: any;
   empleadoForm: FormGroup;
   areaTrabajoForm: FormGroup;
   submitted = false;
   validation_messages = {
    'nombreYApellido': [
      { type: 'required', message: 'El campo nombre y apellido es requerido' },
      { type: 'maxlength', message: 'El campo nombre y apellido no puede ser mas largo que 30 caracteres' },
      { type: 'pattern', message: 'El  campo nombre y apellido solo puede contener letras' }
    ],
    'email': [
      { type: 'required', message: 'El campo email es requerido' },
      { type: 'email', message: 'El campo email tiene que tener un formato tipo name@gmail.com' }
    ],
    'dni': [
      { type: 'required', message: 'El campo DNI es un requerido' },
      { type: 'pattern', message: 'El campo DNI solo puede contener exactamente 8 digitos' }
    ],
    'fechaDeNacimiento': [
      { type: 'required', message: 'El campo fecha de nacimiento es requerido' }
    ],
    'sueldo': [
      { type: 'required', message: 'El campo sueldo es requerido' },
      { type: 'min', message: 'El campo sueldo tiene que se un numero positivo y mayor a 0' }
    ],
    'areaTrabajo': [
      { type: 'min', message: 'Tiene que seleccionar un area de trabajo es campo un obligatorio' }
    ]
  }
  constructor(private empleadoService: EmpleadoService, private areaTrabajoService: AreaTrabajoService, public fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.getAreasTrabajos();
    this.areaTrabajoForm = this.fb.group({
      areaTrabajo: new FormControl(0, Validators.min(1))
    });

    console.log(this.areaTrabajoForm);

    this.empleadoForm = this.fb.group({
      nombreYApellido: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern("^([a-zA-Z]+[,.]?[ ]?|[a-zA-Z]+['-]?)+$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dni: new FormControl(0, [Validators.required, Validators.pattern("^[0-9]{8}$")]),
      fechaDeNacimiento: new FormControl('', Validators.required),
      sueldo: new FormControl(0, [Validators.required, Validators.min(1)]),
      areaTrabajo: new FormControl(0, Validators.min(1))
    });
  }

  empleado() {

    let empleado = {};

    empleado = {
      nombreYApellido: this.empleadoForm.getRawValue().nombreYApellido,
      email: this.empleadoForm.getRawValue().email,
      dni: this.empleadoForm.getRawValue().dni,
      fechaDeNacimiento: this.empleadoForm.getRawValue().fechaDeNacimiento,
      sueldo: this.empleadoForm.getRawValue().sueldo,
      area_trabajo_id: this.empleadoForm.getRawValue().areaTrabajo.id
    }
    console.log(empleado);
    return empleado;
  }

  addEmpleado(): void {
    this.empleadoService.create(this.empleado())
      .subscribe(
        response => {
          response;
          console.log(response);
          this.volver();
        },
        error => {
          console.log(error.error.errors);
        });
  }

  getAreasTrabajos(): void {
    this.areaTrabajoService.getAll()
      .subscribe(
        response => {
          this.areasTrabajos = response.data;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  todasLasValidacionesDelFomulario(form) {         
    Object.keys(form.controls).forEach(campo => {  
      const control = form.get(campo);       
      console.log(control);      
      if (control instanceof FormControl) {             
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        
        this.todasLasValidacionesDelFomulario(control);            
      }
    });
  }

  isFieldValid(campo) {
    return !this.empleadoForm.get(campo).valid 
    && this.empleadoForm.get(campo).touched 
    || (this.empleadoForm.get(campo).untouched && this.submitted);
  }
  
  displayFieldCss(campo) {
    return {
      error: this.isFieldValid(campo),
    };
  }


  volver() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    if (this.empleadoForm.valid) {
      this.submitted = true;
      this.addEmpleado();
    } else {
       this.todasLasValidacionesDelFomulario(this.empleadoForm);
    }
  }


}
