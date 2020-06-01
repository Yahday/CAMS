import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';


@Component({
  selector: 'app-recuperacion-contrasena',
  templateUrl: './recuperacion-contrasena.component.html',
  styleUrls: ['./recuperacion-contrasena.component.css']
})
export class RecuperacionContrasenaComponent implements OnInit {


public correo:string;
public numEmp: string;

  constructor(

  

    private _route: ActivatedRoute,
    private _router:Router
    

  ) { 

    this.correo="@Correo Electronico";
    this.numEmp="Num Empleado";

  }

  ngOnInit(): void {
  }


redireccion(){

this._router.navigate(['/autorizacion']);

}



}
