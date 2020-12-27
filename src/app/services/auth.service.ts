import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import signing from "../models/signinRequest";
import signinRes from "../models/signinResponse";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        @Inject('apiUrl') private apiUrl, private http: HttpClient) {
    }

    loginReq(signin: signing) {
        return this.http.post<signinRes>(this.apiUrl + 'auth/signin', signin)
        
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