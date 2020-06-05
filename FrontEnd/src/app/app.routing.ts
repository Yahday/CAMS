import { ModuleWithProviders }  from  '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { NgModule } from '@angular/core';

//Componentes
import { StartComponent } from './components/start/start.component';
import { CentralesComponent } from './components/centrales/centrales.component';
import { HeaderComponent } from './components/header/header.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { CorrectivosComponent } from './components/correctivos/correctivos.component';
import { OtsComponent } from './components/ots/ots.component';
import { OrdenesCompletadasComponent } from './components/ordenes-completadas/ordenes-completadas.component';
import { OrdenesEnProcesoComponent } from  './components/ordenes-en-proceso/ordenes-en-proceso.component';
import { RecuperacionContrasenaComponent } from './components/login/recuperacion-contrasena/recuperacion-contrasena.component';
import { PantallaAutorizacionComponent } from './components/login/recuperacion-contrasena/pantalla-autorizacion/pantalla-autorizacion.component';
import { AutorizacionComponent } from './components/login/autorizacion/autorizacion.component';

import { AuthGuard } from "./auth.guard";

// Array de rutas
const appRoutes: Routes = [

    {path: '', redirectTo: '/start', pathMatch: 'full'},
    {path: 'start', component: StartComponent, canActivate: [AuthGuard] },    
    {path: 'centrales' , component : CentralesComponent   },
    {path: 'header' ,  component :   HeaderComponent}   ,
    {path: 'registro' ,  component :   RegistroComponent}   ,
    {path: 'login' ,  component :   LoginComponent},   
    {path: 'correctivos' ,  component :   CorrectivosComponent},   
    {path: 'ots' ,  component :   OtsComponent},   
    {path: 'ordenes-completadas' ,  component :   OrdenesCompletadasComponent} ,  
    {path: 'ordenes-en-proceso' ,  component :   OrdenesEnProcesoComponent}   ,
    {path: 'login/forgot' ,  component :   RecuperacionContrasenaComponent} ,  
    {path: 'pantalla-autorizacion' ,  component :   PantallaAutorizacionComponent},   
    {path: 'autorizacion' ,  component :   AutorizacionComponent}   

];

//exportar modulo de rutas
export const appRoutingProviders: any[] =[];
export const routing :ModuleWithProviders = RouterModule.forRoot(appRoutes);