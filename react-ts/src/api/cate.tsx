import { Icate } from "../interfaces/product";
import { instance } from "./instance";
export const getAllcate =()=>{
    return instance.get("category")
}

export const getOne =(id:number|string)=>{
    return instance.get("/category"+id)
}

export const cateAdd =(cate:any)=>{
    return instance.post("/category",cate)
}
export const cateUpdatee =(cate:Icate)=>{
    return instance.put("/category/"+cate._id,cate)
}
export const cateDelete =(id:number|string)=>{
    return instance.delete("/category/"+id)
}