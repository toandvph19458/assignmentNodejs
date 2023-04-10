import React, { useEffect, useState } from 'react';
import{useForm,SubmitHandler} from 'react-hook-form'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space ,Upload ,message} from 'antd';
import "./quickadd.css"
import { Icate, Iproduct } from '../../interfaces/product';
import { productAdd } from '../../api/product';
import { LoadingOutlined, } from '@ant-design/icons';
import axios from 'axios';
import { uploadImage } from '../../api/upload';
import { getAllcate } from '../../api/cate';
const { Option } = Select;
interface IfromInput {
  _id:number,
  name:string,
  price:number,
  img:string
}

interface Iprops {
  onAdd:(product:Iproduct) => any;
}
const Quickadd = (props:Iprops) => {
  const [fileList, setFileList] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [cate,setcate] = useState<Icate[]>([])
  const [imageUrl, setImageUrl] = useState('');
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  useEffect(()=>{
    getAllcate().then(({data})=>setcate(data.cates))
  },[])
  console.log(cate)
  const onHandleSubmit:SubmitHandler<Iproduct> =async (data:Iproduct)=>{
    console.log(fileList[0]?.originFileObj);  
   const imgs= await uploadImage(fileList[0]?.originFileObj);
    
    const newData ={
      ...data,
      img:imgs[0],
    }
    message.success("Thêm thành công");
    props.onAdd(newData);
    setOpen(false);  
}
      const [form]= Form.useForm();
          useEffect(()=>{
            setFidle()
          },[open]);
      const setFidle = ()=>{
              form.setFieldsValue({
                  id:"",
                  name: "",
                  price:"",
                  cateId:""
              })
      }
  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Thêm Nhanh
      </Button>
      <Drawer
        title="Thêm mới sản phẩm"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" hideRequiredMark onFinish={onHandleSubmit} >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên"
                rules={[{ required: true, message: 'Chưa nhập tên' }]}
              >
                <Input placeholder="Tên sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Giá"
                rules={[{ required: true, message: 'Chưa nhập giá' }]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="giá sản phẩm"
                  type='number'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
            <Form.Item label="danh mục" name='cateId'>
        <Select>
          {cate.map((item)=>{
            
            return(<Select.Option value={item._id}>{item.name}</Select.Option>)
          })}
        </Select>
      </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="Upload" valuePropName="file" rules={[{ required: true }]}>
                <Upload beforeUpload={(files)=>{console.log(files);
                   return false}} listType="picture-card" onChange={({ fileList: newFileList }) => setFileList(newFileList)}>
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                </Upload>
            </Form.Item>
            </Col>
          </Row>
            <Form.Item label="Xác nhận">
                <Button type="primary" htmlType="submit">Xác nhận</Button>
            </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default Quickadd;