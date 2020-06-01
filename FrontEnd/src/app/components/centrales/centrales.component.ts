import { Component, OnInit } from '@angular/core';
import {NgModule} from  '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormControl,FormGroup,Validators}  from '@angular/forms';
import { CollapseModule, WavesModule } from 'angular-bootstrap-md';





@Component({
  selector: 'app-centrales',
  templateUrl: './centrales.component.html',
  styleUrls: ['./centrales.component.css']
})


export class CentralesComponent implements OnInit {

  constructor() {



   }
imports:[

  CollapseModule, 
  WavesModule 


]
  


  ngOnInit(): void {



  }

}
