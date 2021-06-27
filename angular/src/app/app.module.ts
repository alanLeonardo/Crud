import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerEmpleadoComponent } from './verEmpleado/verEmpleado.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEmpleadoComponent } from './addEmpleado/addEmpleado.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateEmpleadoComponent } from './updateEmpleado/updateEmpleado.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    VerEmpleadoComponent,
    AddEmpleadoComponent,
    UpdateEmpleadoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
