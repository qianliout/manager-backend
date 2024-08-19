import React from "react"
import {Row, Col, Card} from 'antd'

import './home.css'

const Home = () => {
  const userImg = require('../../assets/images/user.png')


  return (
    <Row className="home">
      <Col span={8}>
        <Card hoverable bordered={false}>
          <div className="user">
            <img src={userImg} alt=""/>
            <div className="userinfo">
              <p className="name">Admin</p>
              <p className="acsses">超级管理员</p>
            </div>
          </div>
          <div className="login-info">
            <p>上次登录时间:<span>2022-08-9</span></p>
            <p>上次登录地点:<span>武汉</span></p>
          </div>
        </Card>
      </Col>
      <Col span={16}/>
    </Row>
  )
}
export default Home;