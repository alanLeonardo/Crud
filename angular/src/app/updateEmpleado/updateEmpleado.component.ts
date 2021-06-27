import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../api/EmpleadoService';
import { Router, ActivatedRoute } from '@angular/router';
import { EmailValidator } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'update-empleado',
  templateUrl: './updateEmpleado.html',
  styleUrls: ['./updateEmpleado.css']
})
export class UpdateEmpleadoComponent implements OnInit {

  id: number;
  empleadoForm: FormGroup;

  empleado: {
    nombreYApellido: '',
    email: '',
    dni: 0,
    fechaDeNacimiento: '',
    sueldo: 0
  }
  submitted = false;

  constructor(private route: ActivatedRoute, private router: Router,
    private empleadoService: EmpleadoService, public fb: FormBuilder) { }


  ngOnInit() {
    this.empleadoForm = this.fb.group({
      nombreYApellido: '',
      email: '',
      dni: 0,
      fechaDeNacimiento: '',
      sueldo: 0
    });

    this.id = this.route.snapshot.params['id'];
    this.getEmpleado();
  }

  updateEmpleado() {
    this.empleadoService.update(this.id, this.empleado)
      .subscribe(data => {
        console.log(data);
        this.volverAHome();
      }, error => console.log(error));
  }

  getEmpleado() {
    this.empleadoService.get(this.id)
      .subscribe(response => {
        console.log(response);
        this.update(response.data);
      }, error => console.log(error));
  }

  volverAHome() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    this.submitted = true;
    this.updateEmpleado();
  }

  update(empleado) {

    this.empleadoForm = this.fb.group({
      nombreYApellido: empleado.nombreYApellido,
      email: empleado.email,
      dni: empleado.dni,
      fechaDeNacimiento: empleado.fechaDeNacimiento,
      sueldo: empleado.sueldo
    });
    this.empleado = this.empleadoForm.getRawValue();
    console.log("update", this.empleado)
  }

}
