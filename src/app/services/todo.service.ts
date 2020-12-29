import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import signing from '../models/signinRequest';
import signinRes from '../models/signinResponse';
import { AuthService } from './auth.service';
import AddTodoReq from '../models/AddTodoReq';
import TodoRes from '../models/todoRes';
import UpdateTodo from '../models/UpdateTodoReq';
import UpdateTodoReq from '../models/UpdateTodoReq';

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
      responseType: 'json',
      observe: 'body',
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

  addTodo(obj: AddTodoReq) {
    return this.http.post(this.apiUrl + "todo/addTodo", obj, this.HTTP_OPTIONS)
  }

  getAllTodos() {
    let data = { beklemede: [], ertelendi: [], tamamlandi: [] };
    this.http.get<TodoRes[]>(this.apiUrl + "todo/getTodos", this.HTTP_OPTIONS)
      .subscribe((response: any) => {
        response.forEach(element => {
          switch (element.status) {
            case 1:
              data.beklemede.push(element)
              break;
            case 2:
              data.ertelendi.push(element)
              break;
            case 3:
              data.tamamlandi.push(element)
              break;
          }
        });
      }, error => {
        console.log(error);
      })

    return data;
  }

  getUserTodos(user_id: number) {
    let params = new HttpParams().set("user_id", user_id.toString());
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${this.user.tokenType} ${this.user.accessToken}`,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      }),
      contentType: 'json',
      params: params
    };
    let data = { beklemede: [], ertelendi: [], tamamlandi: [] };

    this.http.get<TodoRes[]>(this.apiUrl + "todo/getUserTodos", options)
      .subscribe((response: any) => {
        response.forEach(element => {
          switch (element.status) {
            case 1:
              data.beklemede.push(element)
              break;
            case 2:
              data.ertelendi.push(element)
              break;
            case 3:
              data.tamamlandi.push(element)
              break;
          }
        });
      }, error => {
        console.log(error);
      })
    return data;
  }

  updateTodo(obj: UpdateTodoReq) {
    return this.http.post(this.apiUrl + "todo/updateTodo", obj, this.HTTP_OPTIONS)
  }

  removeTodo(todo_id: number) {
    let params = new HttpParams().set("todo_id", todo_id.toString());
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${this.user.tokenType} ${this.user.accessToken}`,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      }),
      contentType: 'json',
      params: params
    };
    return this.http.delete(this.apiUrl + "todo/deleteTodo", options)
  }
}
