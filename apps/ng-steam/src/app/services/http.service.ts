import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly httpClient: HttpClient) {}

  async get<T>(url: string, headers: HttpHeaders): Promise<T> {
    const result = await lastValueFrom<T>(
      this.httpClient.get<T>(url, { headers })
    );
    return result;
  }
}
