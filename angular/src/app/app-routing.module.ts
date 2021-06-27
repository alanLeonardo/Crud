import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmpleadoComponent } from './addEmpleado/addEmpleado.component'
import { VerEmpleadoComponent } from './verEmpleado/verEmpleado.component';
import { UpdateEmpleadoComponent } from './updateEmpleado/updateEmpleado.component';

const routes: Routes = [
 
  {
   path: '',
   redirectTo: 'home',
   pathMatch: 'full'
  },
  { 
    path: 'home', component: VerEmpleadoComponent
  },
  { 
    path: 'add', component: AddEmpleadoComponent
  },
  { 
    path: 'update/:id', component: UpdateEmpleadoComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
