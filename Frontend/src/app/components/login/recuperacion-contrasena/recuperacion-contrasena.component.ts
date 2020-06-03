import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ForgotService } from '../../../services/forgot.service';


@Component({
  selector: 'app-recuperacion-contrasena',
  templateUrl: './recuperacion-contrasena.component.html',
  styleUrls: ['./recuperacion-contrasena.component.css']
})
export class RecuperacionContrasenaComponent implements OnInit {

  public correo:string;
  public numEmp: string;

  user = {
    parametro: '',
    valor: ''
  } 

  constructor(
    private _route: ActivatedRoute,
    private _router:Router,
    private forgotService: ForgotService,    
  ) { 
    this.correo="Correo Electronico";
    this.numEmp="Num Empleado";
  }

  ngOnInit(): void {
  }

  /*Onclick(){
    if (this.isDisabled == false ) {
      this.isDisabled=true;
      this.isDisabled2=false;
    } else {
      this.isDisabled=false;
      this.isDisabled2=true;
    }
  }*/

  sendMail() {
    this.forgotService.sendMail(this.user)
    .subscribe(
      res => {
        console.log(res);
        this._router.navigate(['/login']);
      },
      err => console.log(err)
    )
  }

}