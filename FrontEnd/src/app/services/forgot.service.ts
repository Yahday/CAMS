import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  private URL = 'http://localhost:3000/api' //cambiar por variable de entorno

  constructor(
    private http: HttpClient
  ) { }

  sendMail(user) {
    return this.http.post<any>(this.URL + '/login/forgot', user);
  }
}