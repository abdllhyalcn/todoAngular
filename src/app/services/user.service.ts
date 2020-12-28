import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import AddUserReq from "../models/AddUserReq";
import signinRes from "../models/signinResponse";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
  })
export class UserService {

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
            }),
            contentType: 'json'

        };
    }

    getUsers(){
        return this.http.get(this.apiUrl+"user/getUsers", this.HTTP_OPTIONS);
    }

    addUser(obj: AddUserReq){
        return this.http.post(this.apiUrl+"auth/signup", obj,  this.HTTP_OPTIONS);
    }

}