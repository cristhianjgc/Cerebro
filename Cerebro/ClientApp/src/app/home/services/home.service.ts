import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FibonacciResponse } from 'src/app/core/models';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class HomeService {
  baseUrl: string = 'https://localhost:7166';

  constructor(private http: HttpClient) {}

  getPosition(n: number): Observable<FibonacciResponse> {
    const params = new HttpParams().append('n', n);
    return this.http.get<FibonacciResponse>(`${this.baseUrl}/Fibonacci/GetPosition`, {params});
  }
}
