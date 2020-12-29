export default interface UpdateUserReq{
    user_id:number,
    new_username: string,
    new_email: string,
    isAdmin: Boolean,
    new_password: string
}