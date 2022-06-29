import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserResponse } from 'src/app/core/models';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ProfileService {
  private userId = new BehaviorSubject<string>('');
  userId$ = this.userId.asObservable();

  constructor(private http: HttpClient) {}

  setUser(userId: string) {
    this.userId.next(userId);
  }

  getUser(userId: string): Observable<UserResponse> {
    const params = new HttpParams().append('userId', userId);
    return this.http.get<UserResponse>('/User/Get', {params});
  }

  createUser(request: User | null): Observable<UserResponse> {
    let body = request === null ? {} : request;
    return this.http.post<UserResponse>('/User/Create', body);
  }
}
