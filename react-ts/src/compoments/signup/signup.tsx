import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, message } from 'antd';
import "./sigin.css"
import { Ipropus, Iuser } from '../../interfaces/product';
const { Option } = Select;

const Signup = (props:Ipropus) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onHandleSubmit = (value:Iuser)=>{
    console.log(value)
    message.success("Đăng kí thành công")
    props.useradd(value)
    setOpen(false);
  }
  const [form]= Form.useForm();
  useEffect(()=>{
    setFidle()
  },[open]);
const setFidle = ()=>{
      form.setFieldsValue({
          username: "",
          email:"",
          pass:"",
          repass:"",
      })
}
  return (
    <>
      <Button style={{textAlign:"center", marginLeft:"168px", marginBottom:"20px"}} type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Tạo tài khoản mới
      </Button>
      <Drawer
        title="Đăng kí tài khoản mới"
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
        <Form layout="vertical" hideRequiredMark onFinish={onHandleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="Tên đăng nhập"
                rules={[{ required: true, message: 'Chưa nhập tên' }]}
              >
                <Input placeholder="Tên đăng nhập" />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
                name="email"
                label="Địa chỉ email"
                rules={[{ required: true, message: 'Chưa nhập email' }]}
              >
                <Input placeholder="Email" type='email'/>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="pass"
                label="Mật khẩu"
                rules={[{ required: true, message: 'Chưa nhập mật khẩu' }]}
              >
                <Input.Password placeholder="Nhập mật khẩu mới" type='password'/>
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
                name="repass"
                label="Nhập lại mật khẩu"
                rules={[{ required: true, message: 'Chưa nhập ' }]}
              >
                <Input.Password placeholder="Xác nhận lại mật khẩu" type='password'/>
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

export default Signup;