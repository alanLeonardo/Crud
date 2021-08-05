import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../api/EmpleadoService';
import { Router, ActivatedRoute } from '@angular/router';
import { AreaTrabajoService } from '../api/AreaTrabajoService';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'update-empleado',
  templateUrl: './updateEmpleado.html',
  styleUrls: ['./updateEmpleado.css']
})
export class UpdateEmpleadoComponent implements OnInit {

  empleado: any;
  id: number;
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
    'area_trabajo_id': [
      { type: 'min', message: 'Tiene que seleccionar un area de trabajo es campo un obligatorio' }
    ]
  }

  constructor(private route: ActivatedRoute, private router: Router, private areaTrabajoService: AreaTrabajoService,
    private empleadoService: EmpleadoService, public fb: FormBuilder) { }


  ngOnInit() {

    this.getAreasTrabajos();
    this.id = this.route.snapshot.params['id'];
    this.getEmpleado();

    this.areaTrabajoForm = this.fb.group({
      areaTrabajo: new FormControl(0, Validators.min(1))
    })

    this.empleadoForm = this.fb.group({
      nombreYApellido: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern("^([a-zA-Z]+[,.]?[ ]?|[a-zA-Z]+['-]?)+$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dni: new FormControl(0, [Validators.required, Validators.pattern("^[0-9]{8}$")]),
      fechaDeNacimiento: new FormControl('', Validators.required),
      sueldo: new FormControl(0, [Validators.required, Validators.min(1)]),
      area_trabajo_id: new FormControl(0, Validators.min(1))
    });
  }

  getEmpleado() {
    this.empleadoService.get(this.id)
      .subscribe(response => {
        console.log(response.data);
        this.update(response.data);
      }, error => console.log(error));
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

  update(empleado) {

    this.areaTrabajoForm = this.fb.group({
      areaTrabajo: empleado.area_trabajo_id
    });
  
    this.empleadoForm = this.fb.group({
    nombreYApellido: new FormControl(empleado.nombreYApellido, [Validators.required, Validators.maxLength(30), Validators.pattern("^([a-zA-Z]+[,.]?[ ]?|[a-zA-Z]+['-]?)+$")]),
      email: new FormControl(empleado.email, [Validators.required, Validators.email]),
      dni: new FormControl(empleado.dni, [Validators.required, Validators.pattern("^[0-9]{8}$")]),
      fechaDeNacimiento: new FormControl(empleado.fechaDeNacimiento, Validators.required),
      sueldo: new FormControl(empleado.sueldo, [Validators.required, Validators.min(1)]),
      area_trabajo_id: new FormControl(this.areaTrabajoForm.getRawValue().areaTrabajo, Validators.min(1))
    });
  }

  setEmpleado() {
     this.empleado = {
      nombreYApellido: this.empleadoForm.getRawValue().nombreYApellido,
      email: this.empleadoForm.getRawValue().email,
      dni: this.empleadoForm.getRawValue().dni,
      fechaDeNacimiento: this.empleadoForm.getRawValue().fechaDeNacimiento,
      sueldo: this.empleadoForm.getRawValue().sueldo,
      area_trabajo_id: this.empleadoForm.getRawValue().area_trabajo_id
    }
    console.log(this.empleado);
    return this.empleado;
  }


  updateEmpleado() {

    this.empleadoService.update(this.id,this.setEmpleado())
      .subscribe(data => {
        console.log(data);
        this.volverAHome();
      }, error => console.log(error));
  }

  todasLasValidacionesDelFomulario(form) {
    Object.keys(form.controls).forEach(campo => {
      console.log(campo);
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

  volverAHome() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    if (this.empleadoForm.valid) {
      this.submitted = true;
      this.updateEmpleado();
    } else {
      this.todasLasValidacionesDelFomulario(this.empleadoForm);
   
    }
  }

}
