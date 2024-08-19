import React, {useEffect, useState} from "react"
import {Row, Col, Card, Table} from 'antd'
import * as Icon from '@ant-design/icons'

import './home.css'
import {getData} from '../../api'

const columns = [
  {
    title: '课程',
    dataIndex: 'name'
  },
  {
    title: '今日购买',
    dataIndex: 'todayBuy'
  },
  {
    title: '本月购买',
    dataIndex: 'monthBuy'
  },
  {
    title: '总购买',
    dataIndex: 'totalBuy'
  }
];

const countData = [
  {
    "name": "今日支付订单",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "今日收藏订单",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "今日未支付订单",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  },
  {
    "name": "本月支付订单",
    "value": 1234,
    "icon": "CheckCircleOutlined",
    "color": "#2ec7c9"
  },
  {
    "name": "本月收藏订单",
    "value": 3421,
    "icon": "ClockCircleOutlined",
    "color": "#ffb980"
  },
  {
    "name": "本月未支付订单",
    "value": 1234,
    "icon": "CloseCircleOutlined",
    "color": "#5ab1ef"
  }
]
// 动态获取 icon
const iconToElement = (name) => React.createElement(Icon[name])

const Home = () => {
  const userImg = require('../../assets/images/user.png')
  // 页面加载完成之后调用
  useEffect(() => {
    getData().then(({data}) => {
      console.log(data)

      const {tableData} = data.data
      console.log(tableData)
      setTableData(tableData)
    })
  }, [])

  const [tableData, setTableData] = useState([])


  return (
    <Row className="home">
      <Col span={8}>
        <Card hoverable bordered={false}>
          <div className="user">
            <img src={userImg} alt=""/>
            <div className="userinfo">
              <p className="name">admin</p>
              <p className="acsses">超级管理员</p>
            </div>
          </div>
          <div className="login-info">
            <p>上次登录时间:<span>2022-08-9</span></p>
            <p>上次登录地点:<span>武汉</span></p>
          </div>
        </Card>
        <Card>
          <Table columns={columns} dataSource={tableData} pagination={false} rowKey={"name"}>
          </Table>
        </Card>
      </Col>

      <Col span={16}>
        <div className="num">
          {
            countData.map((item, index) => {
              return (
                <Card key={index}>
                  <div className="icon-box" style={{background: item.color}}>
                    {iconToElement(item.icon)}
                  </div>
                  <div className="detail">
                    <p className="num">${item.value}</p>
                    <p className="tex">{item.name} </p>
                  </div>

                </Card>
              )
            })
          }
        </div>
      </Col>
    </Row>
  )
}
export default Home;