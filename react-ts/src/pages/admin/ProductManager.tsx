import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Popconfirm, Button, Image, message,Breadcrumb} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Icate, Iproduct } from '../../interfaces/product'
import {CloseOutlined} from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import Quickadd from '../../compoments/quickadd/quickadd';

interface DataType {
  // key:number
  _id: number|string,
  name: string,
  price: number,
  img:string

}

interface Iprops {
  products: Iproduct[];
  cates: Icate[];
  onRemove: (id: number | string) => any;
  onAdd:(product:Iproduct) => any;
}
const productManager = (props:Iprops) =>{
  const [data, setData] = useState<Iproduct[]>([])
  useEffect(()=>{
    setData(props.products)
  },[props])
  const [messageApi, contextHolder] = message.useMessage();

  const info = () => {
    messageApi.info('Thành công!');
  };
  const navigate = useNavigate()
  const nextpage =(id:number|string)=>{
    return navigate(`/admin/update/${id}`)
  }
  const handleRemove = (id:number|string)=>{
    message.success("Thành công!")
    props.onRemove(id)
  }
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'image',
      dataIndex: 'img',
      key: 'img',
      render: (text)=> <Image width={100} src={text}/>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={()=>nextpage(record._id)}>Update</Button>
          {contextHolder}
      <Popconfirm
        title="Bạn có chắc muốn xóa sản phẩm này?"
        onConfirm={()=>handleRemove(record._id)}
        okText="Xóa"
        cancelText="Hủy"
        >
        <Button><CloseOutlined /></Button>
      </Popconfirm>
        </Space>
      ),
    },
  ];
  return(
    <>
    <div>
        <Breadcrumb style={{ margin: '16px 0',paddingLeft:10 }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Danh sách sản phẩm</Breadcrumb.Item>
        </Breadcrumb>
    </div>
    <div>
      <Quickadd onAdd={props.onAdd}/>
    </div>
    <Table columns={columns} dataSource={data} pagination={{pageSize:5}}/>
    </>
 
  )
} ;

export default productManager;
