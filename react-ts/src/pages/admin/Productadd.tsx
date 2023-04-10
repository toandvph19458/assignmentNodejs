
import React, { useEffect, useState } from 'react'
import{useForm,SubmitHandler} from 'react-hook-form'
import { Icate, Iproduct } from '../../interfaces/product';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  message,
  Breadcrumb
} from 'antd';
import { uploadImage } from '../../api/upload';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface Iprops  {
    onAdd:(product:Iproduct)=>void
    cates:Icate[]
}
interface IfromInput {
    _id:number,
    name:string,
    price:number,
    img:string,
    cateId:string,
}
const Productadd = (props: Iprops) => {
  const [fileList, setFileList] = useState<any>([]);
    const {register,handleSubmit}=useForm<IfromInput>();
    const[cate,setcate]= useState<Icate[]>([])
    const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
    useEffect(()=>{
      setcate(props.cates)
    },[props])
    const onHandleSubmit:SubmitHandler<IfromInput> = async(data:Iproduct)=>{
        console.log(data);
       
        const imgs= await uploadImage(fileList[0]?.originFileObj);
        const newData ={
          ...data,
          img:imgs[0],
        }
        message.success("Thêm thành công")
        props.onAdd(newData)
    }
  return (
    <>
    <div>
    <Breadcrumb style={{ margin: '16px 0',paddingLeft:10 }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Thêm sản phẩm mới</Breadcrumb.Item>
        </Breadcrumb>
    </div>
    <Checkbox
      checked={componentDisabled}
      onChange={(e) => setComponentDisabled(e.target.checked)}
      style={{marginRight:700}}
    >
      Form disabled
    </Checkbox>
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      disabled={componentDisabled}
      style={{ maxWidth: 600 ,paddingLeft:10}}
      onFinish={onHandleSubmit}
    >
      <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item label="Giá" name='price' rules={[{ required: true }]}>
        <Input type='number' />
      </Form.Item>
      <Form.Item label="danh mục" name='cateId'>
        <Select>
          {cate.map((item)=>{
            
            return(<Select.Option value={item._id}>{item.name}</Select.Option>)
          })}
        </Select>
      </Form.Item>

      <Form.Item label="Upload" valuePropName="fileList" rules={[{ required: true }]}>
        <Upload beforeUpload={(files)=>{console.log(files);
                   return false}} listType="picture-card"  onChange={({ fileList: newFileList }) => setFileList(newFileList)}>
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
        </Upload>
      </Form.Item>
      <Form.Item label="Xác nhận">
        <Button type="primary" htmlType="submit">Xác nhận</Button>
      </Form.Item>
    </Form>
  </>
  )
}

export default Productadd