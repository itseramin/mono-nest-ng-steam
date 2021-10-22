import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  httpOptions: any = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
    }).set('Authorization', `Bearer ${localStorage.getItem('jwt')}`),
  };

  constructor(private http: HttpClient) {}

  public getAllUser() {
    return lastValueFrom(
      this.http.get<Promise<any>>(
        'http://localhost:3000/api/v1/users/',
        this.httpOptions
      )
    );
  }

  public async getInventory(): Promise<any> {
    return lastValueFrom(
      this.http.get<Promise<any>>('http://localhost:3000/api/v1/inventory', {
        ...this.httpOptions,
        observe: 'body',
      })
    );
  }
}
