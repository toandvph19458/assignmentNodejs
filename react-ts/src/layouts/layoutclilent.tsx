import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Layout, Menu, message, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import MenuClient from '../compoments/menu';

const { Header, Footer, Sider, Content } = Layout;
  const LayoutCilent: React.FC = () =>{
    const [user,setuser] = useState({})
    const {
        token: { colorBgContainer },
      } = theme.useToken();
      useEffect(()=>{
        const auth= localStorage.getItem("user")||"";
        if(!auth){
         return message.warning("ban chua dang nhap")
        }
        const user = JSON.parse(auth);
        setuser(user.user)
       },[])
      return(
        (
            <Layout className="layout">
            <Header style={{backgroundColor:"#FFFF"}}>
              
            <div style={{display:"flex"}}>
              <MenuClient/>
              <div>{!user?"":<Button onClick={()=>localStorage.removeItem("user")}>logout</Button>}</div>
            </div>
            </Header>
            <Content style={{ padding: '0 50px' }}>
              <div className="site-layout-content" style={{ background: colorBgContainer }}>
                <Outlet/>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
          </Layout>
          )
      )
  } 
  export default LayoutCilent