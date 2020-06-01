import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {routing , appRoutingProviders} from './app.routing';
import {RouterModule, Routes}  from '@angular/router';




import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HeaderComponent } from './components/header/header.component';
import { CentralesComponent } from './components/centrales/centrales.component';
import { AgregarCentralesComponent } from './components/agregar-centrales/agregar-centrales.component';
import {NgbModal,ModalDismissReasons,NgbModule  }  from '@ng-bootstrap/ng-bootstrap';
import {GoogleMapsModule} from '@angular/google-maps'; 
import { CollapseModule, WavesModule } from 'angular-bootstrap-md';
import {BrowserAnimationsModule}  from '@angular/platform-browser/animations';



import{CommonModule}  from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatSidenavModule}  from '@angular/material/sidenav';
import {MatListModule}  from '@angular/material/list';
import {MatGridListModule}  from '@angular/material/grid-list';
import {MatButtonModule}  from '@angular/material/button';
import {MatIconModule}  from '@angular/material/icon';
import {MatToolbarModule}  from '@angular/material/toolbar';
import {MatMenuModule}  from '@angular/material/menu';

import { LayoutModule } from '@angular/cdk/layout';
import { CorrectivosComponent } from './components/correctivos/correctivos.component';
import { OtsComponent } from './components/ots/ots.component';
import { OrdenesEnProcesoComponent } from './components/ordenes-en-proceso/ordenes-en-proceso.component';
import { OrdenesCompletadasComponent } from './components/ordenes-completadas/ordenes-completadas.component';
import { RecuperacionContrasenaComponent } from './components/login/recuperacion-contrasena/recuperacion-contrasena.component';
import { PantallaAutorizacionComponent } from './components/login/recuperacion-contrasena/pantalla-autorizacion/pantalla-autorizacion.component';
import { AutorizacionComponent } from './components/login/autorizacion/autorizacion.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HeaderComponent,
    CentralesComponent,
    AgregarCentralesComponent,
   CorrectivosComponent,
    OtsComponent,
    OrdenesEnProcesoComponent,
    OrdenesCompletadasComponent,
    RecuperacionContrasenaComponent,
    PantallaAutorizacionComponent,
    AutorizacionComponent,
  
  ],
  imports: [
    BrowserModule,
    NgbModule   ,
    //NgbModal,
    BrowserAnimationsModule,
    CommonModule,
    GoogleMapsModule,
    CollapseModule, 
    WavesModule ,
    RouterModule,
    routing,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,  
    NgSelectModule,  
    MDBBootstrapModule.forRoot(),
    LayoutModule


  ],
  providers: [ appRoutingProviders  ],
    bootstrap: [AppComponent]
})
export class AppModule { }


