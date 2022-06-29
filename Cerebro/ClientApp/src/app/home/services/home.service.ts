import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FibonacciRequest, FibonacciResponse, HistoricalResponse } from 'src/app/core/models';

@Injectable()
export class HomeService {

  constructor(private http: HttpClient) {}

  getHistorical(): Observable<HistoricalResponse> {
    return this.http.get<HistoricalResponse>('/Fibonacci/getHistorical');
  }

  getPosition(request: FibonacciRequest): Observable<FibonacciResponse> {
    return this.http.post<FibonacciResponse>('/Fibonacci/GetPosition', request);
  }
}
