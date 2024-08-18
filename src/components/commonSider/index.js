import React from 'react';
import {Layout, Menu} from 'antd';


import {
    UploadOutlined, UserOutlined, VideoCameraOutlined,
} from '@ant-design/icons';

const {Sider} = Layout;


const CommonSider = () => {
    return (<Sider
            trigger={null}
            collapsed
        >
            <h3 className="app-name">通用后台管理系统</h3>

            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[{
                    key: '1', icon: <UserOutlined/>, label: 'nav 1',
                }, {
                    key: '2', icon: <VideoCameraOutlined/>, label: 'nav 2',
                }, {
                    key: '3', icon: <UploadOutlined/>, label: 'nav 3',
                },]}
            />
        </Sider>)
}
export default CommonSider