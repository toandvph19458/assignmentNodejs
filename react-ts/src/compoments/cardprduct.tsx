import React from 'react';
import { Card , Space } from 'antd';
import { Iprops } from '../interfaces/product';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const Cards= (props:Iprops) => (
 <>
    <Space style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:"10px", justifyContent:"center", alignItems:"center", textAlign:"center"}}>
        {props.products.map((item)=>{
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
 </>
  
);

export default Cards;