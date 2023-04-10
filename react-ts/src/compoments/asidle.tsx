import React from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined,TabletFilled,DatabaseFilled } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useNavigate } from "react-router-dom";
import { Menu } from 'antd';
type Props = {}
type MenuItem = Required<MenuProps>['items'][number];
const Asidle = (props: Props) => {


function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Quản lí sản phẩm', 'sub1', <TabletFilled />, [
    getItem('Danh sách sản phẩm', '1'),
    getItem('Thêm mới sản phẩm', '2'),
  ]),

  getItem('Quản lí danh mục', 'sub2', <DatabaseFilled />, [
    getItem('Danh sách danh mục', '3'),
    getItem('Thêm mới danh mục', '4'),
  
  ]),

  { type: 'divider' },
];
const navigate = useNavigate()
const onClick: MenuProps['onClick'] = (e) => {
    
   if(e.key=="1"){
    return navigate("/admin/productManager")
   }
   if(e.key=="2"){
    return navigate("/admin/addproduct")
   }
   if(e.key=="3"){
    return navigate("/admin/cateManager")
   }
   if(e.key=="4"){
    return navigate("/admin/addcate")
   }
  };
  return (
    <>
    <Menu
      onClick={onClick}
      style={{width:250 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
    </>
  )
}

export default Asidle