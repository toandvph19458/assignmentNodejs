import React, { useEffect, useState } from 'react'
import { Iproduct, Iprops } from '../interfaces/product'
import { useParams } from 'react-router-dom'
import { getOne } from '../api/cate'
import { getAllcateproduct, getOneproduct } from '../api/product'
import { Card,Space } from 'antd'
import { Link } from 'react-router-dom';
const { Meta } = Card;
const ProductDetail = (props: Iprops) => {
  const[product,setProduct] = useState<any>({})
  const[listproduct,setlist] = useState<Iproduct[]>([])
  const {id} = useParams();
  useEffect(()=>{
      getOneproduct(id).then(({data})=>setProduct(data.product))
      setProduct(product);
  },[product])
  useEffect(()=>{
    getAllcateproduct(product.cateId).then(({data})=>setlist(data.product))
  },[product])
console.log(listproduct)
  return (
    <div style={{textAlign:"center"}}>
          <h1>{product.name}</h1>
          <div>
            <img width={200} src={product.img} alt="" />
          </div>
          <p>{product.price}VND</p>
          
          <div>
            <h3>Sản phẩm liên quan </h3>
            
            <div>
                <Space style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:"10px", justifyContent:"center", alignItems:"center", textAlign:"center"}}>
                    {listproduct?.map((item)=>{
                        return(
                          <Link to={"/"+item._id}>
                            <Card
                            hoverable
                            style={{ width: 200 }}
                                cover={<img alt="example" src={item.img}/>}
                            >
                                <Meta title={item.name} description="mua 1 tặng 1 tính tiền 2" />
                                <Meta title={item.price+"VNĐ"} description="" />
                            </Card>
                          </Link>
                        )
                    })}
                </Space>
            </div>
          </div>
    </div>
  )
}

export default ProductDetail