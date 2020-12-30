import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import SigninReq from "../models/SigninReq";
import SigninRes from "../models/SigninRes";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        @Inject('apiUrl') private apiUrl, private http: HttpClient) {
    }

    loginReq(signin: SigninReq) {
        return this.http.post<SigninRes>(this.apiUrl + 'auth/signin', signin)
        
    }

    saveUser(signinRes: SigninRes) {
        sessionStorage.setItem('user', JSON.stringify(signinRes));
    }

    deleteUser(){
        sessionStorage.removeItem('user');
    }

    getUser(): SigninRes{
        return JSON.parse(sessionStorage.getItem('user'));
    }


}