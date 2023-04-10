export interface Iproduct {
    _id:number|string,
    name:string,
    price:number,
    img:string,
    cateId:string|number

 }
export interface Iprops{
    products:Iproduct[]
}
export interface Iuser {
    _id:number|string,
    username:string,
    pass:string
    email:string,
    role:string
}
export interface Ipropus{

   useradd:(user:Iuser)=>any
}
export interface Icate{
    _id:number|string,
    name:String
}