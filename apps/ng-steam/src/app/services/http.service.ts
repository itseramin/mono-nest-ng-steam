import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  httpOptions: any = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
    }),
  };

  constructor(private http: HttpClient) {}

  login() {
    return this.http.get<any>(
      'http://localhost:3000/api/v1/auth/steam/',
      this.httpOptions
    );
  }
}
