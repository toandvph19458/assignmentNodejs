import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Space, Breadcrumb, message } from 'antd';
import Signup from '../compoments/signup/signup';
import { Ipropus, Iuser } from '../interfaces/product';
interface  Iprops{
    useradd:(user:Iuser)=>any,
    login:(user:any)=>any,
}
const Signin= (props:Iprops) => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
       props.login(values)
};
      
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
   return (
       <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Đăng nhập</Breadcrumb.Item>
  
            </Breadcrumb>
            <div style={{textAlign:"center"}}>
                <h1>Đăng Nhập</h1>
                <div style={{ alignItems:"center", textAlign:"center",justifyContent:"center",justifyItems:"center" ,display:"flex"}}>
                <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ width: 500}}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Chưa nhập email!' }]}
                >
                    <Input type='email' />
                </Form.Item>
            
                <Form.Item
                    label="Password"
                    name="pass"
                    rules={[{ required: true, message: 'Chưa nhập mật khẩu!' }]}
                >
                    <Input.Password />
                </Form.Item>       
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
                </Form>
            </div>
            <div>
                <Signup useradd={props.useradd}/>
            </div>
            </div>
            
       </>
      );
}

export default Signin;