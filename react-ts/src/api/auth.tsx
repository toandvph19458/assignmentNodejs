import { Iuser } from "../interfaces/product";
import { instance } from "./instance";
export const signinuser =(user:any)=>{
    return instance.post("/auth/signin",user)
}

export const userAdd =(user:Iuser)=>{
    return instance.post("/auth/signup",user)
}