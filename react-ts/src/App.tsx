import { useEffect, useState } from 'react'
import { Routes,Route } from "react-router-dom";
import Admin from './layouts/admin';
import ProductManager from "./pages/admin/ProductManager"
import { Icate, Iproduct, Iuser } from './interfaces/product';
import { getAll, productAdd, productDelete, productUpdate } from './api/product';
import Productadd from './pages/admin/Productadd';
import ProductUpdate from './pages/admin/ProductUpdate';
import { useNavigate } from "react-router-dom";
import LayoutCilent from './layouts/layoutclilent';
import Home from './pages/home';
import Signin from './pages/sigin';
import { getAlluser } from './api/user';
import { signinuser, userAdd } from './api/auth';
import { message } from 'antd';
import ProductDetail from './pages/productDetail';
import Catemanager from './pages/admin/catemanager';
import { cateAdd, cateDelete, cateUpdatee, getAllcate } from './api/cate';
import Addcate from './pages/admin/addcate';
import Updatecate from './pages/admin/updatecate';

function App() {
const [products , setProducts] = useState<Iproduct[]>([]);
const [users , setusers] = useState<Iuser[]>([]);
const [cates , setcates] = useState<Icate[]>([]);
useEffect(()=>{
  getAll().then(({data})=>setProducts(data.products))
  getAllcate().then(({data})=>setcates(data.cates))
},[])
const navigate = useNavigate()
const onAdd =(product:Iproduct)=>{
  console.log(product)
  productAdd(product).then(()=> {
    getAll().then(({data})=>setProducts(data.products))
    getAllcate().then(({data})=>setcates(data.cates))
  }).then(()=>navigate("/admin/productManager"))
}
const onUpdate = (product:Iproduct )=>{
 productUpdate(product).then(()=> getAll().then(({data})=>setProducts(data.products)));
 
}
const cateUpdate = (cate:Icate )=>{
 cateUpdatee(cate).then(()=>{
  getAll().then(({data})=>setProducts(data.products))
  getAllcate().then(({data})=>setcates(data.cates))
 });
  
 }
const onRemove=(id:number|string)=>{
  productDelete(id).then(()=>{
    getAll().then(({data})=>setProducts(data.products))
    getAllcate().then(({data})=>setcates(data.cates))
  })
}
const useradd=(user:Iuser)=>{
  userAdd(user)
}
const cateadd=(cate:any)=>{
  cateAdd(cate).then(()=> getAllcate().then(({data})=>setcates(data.cates)))
}
const onRemoveCate = (id:number|string)=>{
  cateDelete(id).then(()=>{
    getAll().then(({data})=>setProducts(data.products))
    getAllcate().then(({data})=>setcates(data.cates))
  })
}
const login =async (user:any)=>{
 const {data}=await signinuser(user)
 console.log(data)
 localStorage.setItem("user",JSON.stringify(data))

 if(data.user.role=="admin"){
  localStorage.setItem("lock",JSON.stringify("true"))
  navigate("/admin/productManager")
 }
 else{
  localStorage.setItem("lock",JSON.stringify("false"))
  navigate("/")
  
 }
  message.success("Đăng nhập thành công")
}
  return (
    <div className="App">
      <Routes>
          
           <Route path='/' element={<LayoutCilent/>}>
            <Route path=''index element={<Home products={products}/>}/>
            <Route path='signin' element={<Signin useradd={useradd} login={login}/>}/>
            <Route path=':id' element={<ProductDetail  products={products}/>}/>
          </Route>
          
          <Route path='/admin' element={<Admin/>}>
            <Route path='productManager' element={<ProductManager products={products} onRemove={onRemove} onAdd={onAdd} cates={cates}/>}/>
            <Route path='addproduct' element={<Productadd onAdd={onAdd} cates={cates}/>}/>
            <Route path='update/:id' element={<ProductUpdate onUpdate={onUpdate} products={products} cates={cates}/>}/>
            <Route path='cateManager' element={<Catemanager cates={cates}  onRemoveCate={ onRemoveCate}/>}/>
            <Route path='addcate' element={<Addcate cateadd={cateadd}/>}/>\
            <Route path='cate/update/:id' element={<Updatecate cates={cates} cateUpdate={cateUpdate}/>}/>
          </Route>
      </Routes>
    </div>
  )
}

export default App
