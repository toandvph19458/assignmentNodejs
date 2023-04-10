import { Iuser } from "../interfaces/product";
import { instance } from "./instance";
export const getAlluser =()=>{
    return instance.get("/users")
}

export const getOne =(id:number|string)=>{
    return instance.get("/users"+id)
}

export const userAdd =(user:Iuser)=>{
    return instance.post("/users",user)
}
export const userUpdate =(user:Iuser)=>{
    return instance.put("/users/"+user._id,user)
}
export const userDelete =(id:number|string)=>{
    return instance.delete("/users/"+id)
}