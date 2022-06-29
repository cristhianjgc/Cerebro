import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FibonacciRequest, FibonacciResponse, HistoricalResponse } from 'src/app/core/models';

@Injectable()
export class HomeService {
  baseUrl: string = 'https://localhost:7166';

  constructor(private http: HttpClient) {}

  getHistorical(): Observable<HistoricalResponse> {
    return this.http.get<HistoricalResponse>(`${this.baseUrl}/Fibonacci/getHistorical`);
  }

  getPosition(request: FibonacciRequest): Observable<FibonacciResponse> {
    return this.http.post<FibonacciResponse>(`${this.baseUrl}/Fibonacci/GetPosition`, request);
  }
}
