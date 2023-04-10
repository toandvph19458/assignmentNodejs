import React, { useEffect, useState } from 'react';
import { UserOutlined ,PictureOutlined, BankOutlined } from '@ant-design/icons';
import { Button, MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
const MenuClient = () => {

  const [current, setCurrent] = useState('mail');

  const items: MenuProps['items'] = [
    {
      label: (
        <Link to="">
            <BankOutlined />
          Home
        </Link>
      ),
      key: 'alipay',
    },
    {
        label: (
          <Link to="">
            <PictureOutlined />
            Bộ sưu tập
          </Link>
        ),
        key: 'a',
    },
    {
        label: (
          <Link to="/signin">
            <UserOutlined />
            Đăng nhập
          </Link>
        ),
        key: 'al',
    },
  ];
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default MenuClient;