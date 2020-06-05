import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators}  from '@angular/forms';
import { CollapseModule, WavesModule } from 'angular-bootstrap-md';





@Component({
  selector: 'app-correctivos',
  templateUrl: './correctivos.component.html',
  styleUrls: ['./correctivos.component.css']
})
export class CorrectivosComponent implements OnInit {

  constructor() { }


  imports:[

    CollapseModule, 
    WavesModule 
  
  
  ]



  ngOnInit(): void {
  }






}
