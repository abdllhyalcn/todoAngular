import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import signing from '../models/signinRequest';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  }),
  contentType: 'json'
  
};
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    @Inject('apiUrl') private apiUrl, private http:HttpClient) {
  }

  addTodo(obj){
    return this.http.post(this.apiUrl,obj)
  }

  getAllTodos(){
    return this.http.get(this.apiUrl)
  }

  updateTodo(obj){
    return this.http.put(this.apiUrl,obj)
  }

  removeTodo(id){
    return this.http.delete(this.apiUrl+'/'+id)
  }
}
