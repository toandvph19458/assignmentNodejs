import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Popconfirm, Button, Image, message,Breadcrumb} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Icate, Iproduct } from '../../interfaces/product'
import {CloseOutlined} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import Quickadd from '../../compoments/quickadd/quickadd';

interface Iprops{
    cates:Icate[],
    onRemoveCate:(id:number|string)=>any
}
interface DataType {
    // key:number
    _id: number|string,
    name: string,
    products:number|string
  }
const Catemanager = (props:Iprops ) => {
    const [data, setData] = useState<Icate[]>([])
    useEffect(()=>{
      setData(props.cates)
    },[props])
    const [messageApi, contextHolder] = message.useMessage();
  
    const info = () => {
      messageApi.info('Thành công!');
    };
    const navigate = useNavigate()
    const nextpage =(id:number|string)=>{
      return navigate(`/admin/cate/update/${id}`)
    }
    const handleRemove = (id:number|string)=>{
      message.success("Thành công!");
      props. onRemoveCate(id)
    }

    const columns: ColumnsType<Icate> = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',

        },
        {
          title: 'Số lượng sản phẩm',
          dataIndex: 'products',
          key: 'quantity',
          render:(text)=>{
          console.log(text)
          return(text.length)
         }
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            record.name=="không xác định"?"": <Space size="middle">
            <Button onClick={()=>nextpage(record._id)} >Update</Button>
            {contextHolder}
        <Popconfirm
          title="Bạn có chắc muốn xóa sản phẩm này?"
          onConfirm={(e)=>handleRemove(record._id)}
          okText="Xóa"
          cancelText="Hủy"
          >
          <Button><CloseOutlined /></Button>
        </Popconfirm>
          </Space>
           
          ),
        },
      ];
  return (
    <>
    <div>
        <Breadcrumb style={{ margin: '16px 0',paddingLeft:10 }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Danh sách danh mục</Breadcrumb.Item>
        </Breadcrumb>
    </div>
    <div>
    </div>
    <Table columns={columns} dataSource={data}/>
    </>
  )
}

export default Catemanager