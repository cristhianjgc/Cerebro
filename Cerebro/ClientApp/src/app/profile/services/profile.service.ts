import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User, UserResponse } from 'src/app/core/models';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) {}

  getUser(userId: string): Observable<UserResponse> {
    const params = new HttpParams().append('userId', userId);
    return this.http.get<UserResponse>('/User/Get', {params});
  }

  updateUser(request: User): Observable<UserResponse> {
    return this.http.post<UserResponse>('/User/Update', request);
  }
}
