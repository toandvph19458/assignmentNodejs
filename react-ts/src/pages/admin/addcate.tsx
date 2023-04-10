
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
import { cateAdd } from '../../api/cate';
import { useNavigate } from 'react-router-dom';
interface IfromInput {
  name:string,

}
interface Iprops  {
  cateadd:(cate:any)=>void
}

const Addcate = (props: Iprops) => {
  const navigate = useNavigate()
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
    const onHandleSubmit:SubmitHandler<IfromInput> = async(data:IfromInput)=>{
        console.log(data);
        props.cateadd(data)
        message.success("Thêm thành công")
        navigate("/admin/cateManager")
    }
  return (
    <>
    <div>
    <Breadcrumb style={{ margin: '16px 0',paddingLeft:10 }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Thêm sản danh mục</Breadcrumb.Item>
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
      <Form.Item label="Tên danh mục" name="name" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item label="Xác nhận">
        <Button type="primary" htmlType="submit">Xác nhận</Button>
      </Form.Item>
    </Form>
  </>
  )
}

export default Addcate