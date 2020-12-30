import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import AddUserReq from "../models/AddUserReq";
import SigninRes from "../models/SigninRes";
import UpdateUserReq from "../models/UpdateUserReq";
import UserRes from "../models/UserRes";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private user: SigninRes;
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
 
    getUsers() {
        return this.http.get<UserRes[]>(this.apiUrl + "user/getUsers", this.HTTP_OPTIONS)
    }

    addUser(obj: AddUserReq) {
        return this.http.post(this.apiUrl + "auth/signup", obj, this.HTTP_OPTIONS);
    }

    deleteUser(user_id: number) {
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
        return this.http.delete(this.apiUrl + "user/deleteUser", options);
    }

    updateUser(obj: UpdateUserReq){
        return this.http.post(this.apiUrl+"user/updateUser", obj, this.HTTP_OPTIONS);
    }

}