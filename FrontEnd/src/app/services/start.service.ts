import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class StartService {

  private URL = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getStart() {
    return this.http.get<any>(this.URL + '/start')
  }

}
