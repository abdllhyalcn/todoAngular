import { logging } from "protractor";

export default interface signinRes{
    id: Int32Array,
    username: string,
    email: string,
    roles : Array<string>,
    accessToken: string,
    tokenType: string
}