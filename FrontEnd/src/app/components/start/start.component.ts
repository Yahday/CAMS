import { Component, OnInit } from '@angular/core';
import { StartService } from "../../services/start.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})

export class StartComponent implements OnInit {
  private URL = 'http://localhost:3000/api' //cambiar por variable de entorno
  constructor(
      private startService: StartService,
      private router: Router
    ) { }

  ngOnInit(): void {
    this.startService.getStart()
    .subscribe(
      res => {
        if (res.usuario == null){
          console.log(res)
          this.router.navigate(['/login']);
        } else {
          console.log(res)
        }
      },
      err => {
        console.log(err)
      } 
    )
  }

}