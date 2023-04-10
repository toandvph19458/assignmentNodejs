import React, { useEffect } from 'react'
import{Navigate, Outlet} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { Layout, Space, message } from 'antd';
import Asidle from '../compoments/asidle';
import Headeradmin from '../compoments/headeradmin';
const Admin = () => {
  const navigate = useNavigate()

useEffect(()=>{
  const user=  localStorage.getItem("user")||""
  const loc=  localStorage.getItem("lock")||""
  const auth = JSON.parse(user)
  const lock= JSON.parse(loc)
  console.log(lock)
  if(lock=="false"){
    message.error("Bạn không truy cập được tài nguyên này")
    navigate("/")
  }
},[])
 
  const { Header, Footer, Sider, Content } = Layout;
  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#ffff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
  };
  
  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#FFFF',
    paddingLeft:50
  };
  
  const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#FFFF',
   paddingRight:20
  };
  
  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#FFFF',
  };
  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
      <Header style={headerStyle}><Headeradmin/></Header>
      <Layout>
        <Sider style={siderStyle}><Asidle/></Sider>
        <Content style={contentStyle}><Outlet/></Content>
      </Layout>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
      </Space>
    </>
  )
}

export default Admin