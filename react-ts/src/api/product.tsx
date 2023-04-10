import { Iproduct } from "../interfaces/product";
import { instance } from "./instance";
export const getAll =()=>{
    return instance.get("products")
}
export const getAllcateproduct =(id:number|string|undefined)=>{
    return instance.get("products/cate/"+id)
}
export const getOneproduct =(id:number|string|undefined)=>{
    return instance.get("products/"+id)
}

export const productAdd =(product:Iproduct)=>{
    return instance.post("products",product)
}
export const productUpdate =(product:Iproduct)=>{
    return instance.put("products/"+product._id,product)
}
export const productDelete =(id:number|string)=>{
    console.log(id)
    return instance.delete("products/"+id)
}