import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmpleadoComponent } from './addEmpleado/addEmpleado.component'
import { VerEmpleado } from './verEmpleado/verEmpleado.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  { 
    path: 'home', component: VerEmpleado
  },
  { 
    path: 'addEmpleado', component: AddEmpleadoComponent
  },
  { 
    path: 'addEmpleado/:id', component: AddEmpleadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
