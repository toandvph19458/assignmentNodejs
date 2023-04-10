import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import React, { useEffect, useState } from 'react'

type Props = {}
interface Iuser {
  email:string,
  _id:string|number|null,
}
const Headeradmin = (props: Props) => {
  const [user,setuser] = useState<any>({})
  useEffect(()=>{
    const auth = localStorage.getItem("user")||"";
    const comperuser = JSON.parse(auth)
    setuser(comperuser.user)
  },[])
  
  return (
    <>
        <Space direction="vertical" size={10}>
               <div style={{display:"flex"}}>
               <div>{user.role=="admin"?"Xin chào : Admin Toàn":""}</div>
                <div><Avatar size={50} icon={<UserOutlined />} /></div>
               </div>
        </Space>
    </>
  )
}

export default Headeradmin