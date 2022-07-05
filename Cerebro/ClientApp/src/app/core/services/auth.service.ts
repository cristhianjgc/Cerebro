import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserResponse } from 'src/app/core/models';

@Injectable()
export class AuthService {
  private userId = new BehaviorSubject<string>('');
  userId$ = this.userId.asObservable();

  constructor(private http: HttpClient) {}

  setUser(userId: string) {
    this.userId.next(userId);
  }

  createUser(request: User | null): Observable<UserResponse> {
    let body = request === null ? {} : request;
    return this.http.post<UserResponse>('/User/Create', body);
  }
}
