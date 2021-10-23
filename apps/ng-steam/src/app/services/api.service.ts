import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
  }).set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);

  private readonly BASE_URL = 'http://localhost:3000/api/v1';

  constructor(private readonly httpService: HttpService) {}

  public async getUserProfile(): Promise<any> {
    return await this.httpService.get(
      `${this.BASE_URL}/users/profile`,
      this.headers
    );
  }

  public async getInventory(): Promise<any> {
    return await this.httpService.get(
      `${this.BASE_URL}/inventory`,
      this.headers
    );
  }
}
