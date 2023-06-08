import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpUsersListResponse } from '../types/users.type';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public perPage = 6;

  constructor(protected http: HttpClient) { }

  getUsers(page: number): Observable<HttpUsersListResponse> {
    return (this.http.get(`${environment.apiLink}/users?delay=1&page=${page}&per_page=${this.perPage}`)) as Observable<HttpUsersListResponse>;
  }
  createUser(user: any): Observable<HttpUsersListResponse>{
    return this.http.post(`${environment.apiLink}/users`, user) as Observable<HttpUsersListResponse>
  }
  updateUser(user: HttpUsersListResponse, userId: number): Observable<HttpUsersListResponse> {
    return this.http.put(`${environment.apiLink}/users/${userId}`, user) as Observable<HttpUsersListResponse>;
  }
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${environment.apiLink}/users/${userId}`);
  }
}

