import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../api/EmpleadoService';
import { AreaTrabajoService } from '../api/AreaTrabajoService';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

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
      { type: 'min', message: 'El campo sueldo tiene que se un numero positivo' }
    ],
    'areaTrabajo': [
      //{ type: 'required', message: 'Tiene que seleccionar un area de trabajo es campo un obligatorio' },
      { type: 'min', message: 'Tiene que seleccionar un area de trabajo es campo un obligatorio' }
    ]
  }

  validation_AreaTrabajo_message = {
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
      sueldo: new FormControl(0, [Validators.required, Validators.min(0)]),
      areaTrabajo: new FormControl(0, Validators.min(1))
    });
  }

  numberValidation(control: FormControl): { [key: string]: any } {
    const value: string = control.value || '';
    const valid = value.match(/^\d{8}$/);
    return valid ? null : { ssn: true };
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
          this.errors();
        });
  }

  errors() {

    return swal.fire({
      title: 'Error',
      text: "ocurrio un error al guardar los datos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
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

  volver() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    if (this.empleadoForm.valid) {
      this.submitted = true;
      this.addEmpleado();
      return swal.fire({
        title: 'Registro completado',
        text: "El registro a sido exitos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      });
    } else {
      return swal.fire({
        title: 'Error',
        text: "Se debe completar los datos requeridos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      });
    }
  }


}
