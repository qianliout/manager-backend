import React from 'react';

import {Button, Layout, theme} from 'antd';
import {Outlet} from "react-router-dom";
import CommonSider from '../components/commonSider'
import CommonHeader from '../components/commonHeader'

import {useSelector} from 'react-redux'


const {Header, Content} = Layout;
const Main = () => {
  // const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  const collapsed = useSelector(state => state.tab.isCollapse);

  return (
    <Layout className="main-container">
      <CommonSider collapsed={collapsed}/>
      <Layout>
        <CommonHeader collapsed={collapsed}/>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div>
            <Outlet/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Main;