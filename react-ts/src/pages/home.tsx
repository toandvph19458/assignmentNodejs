import React from 'react'
import { Breadcrumb,Space } from 'antd'
import Cards from '../compoments/cardprduct'
import { Iproduct } from '../interfaces/product'
interface Iprops{
    products:Iproduct[]
}
const Home = (props:Iprops) => {
  
  return (
    <div className='' style={{textAlign:"center"}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <Space>
            <Cards products={props.products}/>
        </Space>
    </div>
  )
}

export default Home