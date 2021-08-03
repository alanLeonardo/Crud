import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../api/EmpleadoService';
import { Router, ActivatedRoute } from '@angular/router';
import { AreaTrabajoService } from '../api/AreaTrabajoService';
import { EmailValidator ,Validators,FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'update-empleado',
  templateUrl: './updateEmpleado.html',
  styleUrls: ['./updateEmpleado.css']
})
export class UpdateEmpleadoComponent implements OnInit {
  
  areasTrabajos: any;
  id: number;
  empleadoForm: FormGroup;
  areaTrabajoForm: FormGroup;
  //areaTrabajo: any;
  empleado: {
    nombreYApellido: '',
    email: '',
    dni: 0,
    fechaDeNacimiento: '',
    sueldo: 0
    areaTrabajo: 0
  }
  submitted = false;

  constructor(private route: ActivatedRoute, private router: Router,private areaTrabajoService: AreaTrabajoService,
    private empleadoService: EmpleadoService, public fb: FormBuilder) { }


  ngOnInit() {

    //this.getAreasTrabajos();

    this.areaTrabajoForm = this.fb.group({
      area_trabajo_id: [0,Validators.required]
    });

    this.empleadoForm = this.fb.group({
      nombreYApellido: ['',[Validators.required, Validators.maxLength(30)]],
      email: ['',[Validators.required, Validators.email]],
      dni: [0,[Validators.required,Validators.maxLength(8), Validators.maxLength(8)]],
      fechaDeNacimiento: ['',Validators.required],
      sueldo: [0,Validators.required],
      areaTrabajo: [0,Validators.required]
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
        console.log(response.data);
        this.update(response.data);
      }, error => console.log(error));
  }

  volverAHome() {
    this.router.navigate(['/home']);
  }

  onSubmit() {

    if (this.empleadoForm.valid) {
      this.submitted = true;
      this.updateEmpleado();
    } else {
      alert("ERROR!");
    }
  }
/*
  getAreasTrabajos(): void {
    this.areaTrabajoService.getAll()
      .subscribe(
        response => {
          this.areasTrabajos = response.data;
          console.log(response.data);
        },
        error => {
          console.log(error);
        });
  }
*/
  update(empleado) {
    
    this.areaTrabajoForm = this.fb.group({
      areaTrabajo: empleado.area_trabajo_id
    });
    console.log(this.areaTrabajoForm.getRawValue());
    this.empleadoForm = this.fb.group({
      nombreYApellido: empleado.nombreYApellido,
      email: empleado.email,
      dni: empleado.dni,
      fechaDeNacimiento: empleado.fechaDeNacimiento,
      sueldo: empleado.sueldo,
      area_trabajo_id: this.areaTrabajoForm.getRawValue().areaTrabajo
    });

    this.empleado = this.empleadoForm.getRawValue();
    
  }

}
