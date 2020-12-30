import { logging } from "protractor";

export default interface SigninRes{
    id: Int32Array,
    username: string,
    email: string,
    roles : Array<string>,
    accessToken: string,
    tokenType: string
}