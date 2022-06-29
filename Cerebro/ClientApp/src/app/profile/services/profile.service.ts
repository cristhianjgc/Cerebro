import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User, UserResponse } from 'src/app/core/models';

@Injectable()
export class ProfileService {
  baseUrl: string = 'https://localhost:7166';

  constructor(private http: HttpClient) {}

  getUser(userId: string): Observable<UserResponse> {
    const params = new HttpParams().append('userId', userId);
    return this.http.get<UserResponse>(`${this.baseUrl}/User/Get`, {params});
  }

  createUser(request: User | null): Observable<UserResponse> {
    let body = request === null ? {} : request;
    return this.http.post<UserResponse>(`${this.baseUrl}/User/Create`, body);
  }
}
