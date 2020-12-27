import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import signing from '../models/signinRequest';
import signinRes from '../models/signinResponse';
import { AuthService } from './auth.service';
import AddTodoReq from '../models/AddTodoReq';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private user: signinRes;
  private HTTP_OPTIONS;
  constructor(
    @Inject('apiUrl') private apiUrl, private http: HttpClient) {
    const authService = new AuthService(null, null);
    this.user = authService.getUser();
    this.HTTP_OPTIONS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${this.user.tokenType} ${this.user.accessToken}`,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      }),
      contentType: 'json'

    };
  }

  addTodo(obj:AddTodoReq) {
    return this.http.post(this.apiUrl, obj, this.HTTP_OPTIONS)
  }

  getAllTodos() {
    return this.http.get(this.apiUrl)
  }

  updateTodo(obj) {
    return this.http.put(this.apiUrl, obj)
  }

  removeTodo(id) {
    return this.http.delete(this.apiUrl + '/' + id)
  }
}
