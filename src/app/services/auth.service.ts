import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import signing from "../models/signinRequest";
import signinRes from "../models/signinResponse";


const HTTP_OPTIONS = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    }),
    contentType: 'json'

};
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        @Inject('apiUrl') private apiUrl, private http: HttpClient) {
    }

    loginReq(signin: signing) {
        return this.http.post<signinRes>(this.apiUrl + 'auth/signin', signin, HTTP_OPTIONS)
        
    }

    saveUser(signinRes: signinRes) {
        sessionStorage.setItem('user', JSON.stringify(signinRes));
    }

    deleteUser(){
        sessionStorage.removeItem('user');
    }

    getUser(): signinRes{
        return JSON.parse(sessionStorage.getItem('user'));
    }


}