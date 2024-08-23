import React from 'react';
import {Layout, Menu} from 'antd';
import * as Icon from '@ant-design/icons'

import {useNavigate} from 'react-router-dom'
import MenuConfig from "../../config"


const {Sider} = Layout;


// 动态获取 icon
const iconToElement = (name) => React.createElement(Icon[name])


// 处理数据
const items = MenuConfig.map((icon) => {
    const child = {
      key: icon.path,
      icon: iconToElement(icon.icon),
      label: icon.label,
    }
    if (icon.children) {
      child.children = icon.children.map(item => {
        return {
          key: item.path,
          label: item.label,
        }
      })
    }
    return child
  }
)


const CommonSider = ({collapsed}) => {
  const navigate = useNavigate()

  const selectMenu = (e) => {
    console.log(e)
    navigate(e.key)
  }

  return (
    <Sider
      collapsed={collapsed}
    >
      <h3 className="app-name">
        {!collapsed ? "通用后台管理系统" : "后台"}
      </h3>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}

        items={items}

        style={{
          height: '100%',
        }}
        onClick={selectMenu}
      />
    </Sider>)
}
export default CommonSider