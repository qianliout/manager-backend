import React, {useEffect, useState} from "react"
import {Button, Form, Input, Table, Popconfirm, Modal} from 'antd'

import './user.css'
import {getUser} from '../../api'

const User = () => {
  const [listData, setListData] = useState({name: ''})
  const [tableData, setTableData] = useState([]);
  const [modalType, setModalType] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = (type, rowData) => {
    console.log('handle click', type, rowData)
    if (type === 'add') {
      setModalType(0)
    } else {
      setModalType(1)
    }
    setModalOpen(!modalOpen)


  }
  const handleDelete = (rowData) => {

  }
  // 提交
  const handleFinish = (e) => {
    setListData({name: e.name})
  }
  const getTableData = () => {
    getUser().then(res => {
      console.log("user res:", res)
      setTableData(res.data.list)
    })
  }
  const handleOk = () => {

  }
  const handleCancel = () => {
    setModalOpen(false);
  }
  useEffect(() => {
    getTableData()
  }, [])

  const columns = [
    {
      title: "姓名",
      dataIndex: 'name',
    },
    {
      title: "年龄",
      dataIndex: 'age',
    },
    {
      title: "性别",
      dataIndex: 'sex',
      render: (val) => {
        return val ? '男' : '女'
      }
    },
    {
      title: "出生日期",
      dataIndex: 'birth',
    },
    {
      title: "地址",
      dataIndex: 'addr',
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <div className="flex-box">
            <Button style={{marginRight: '5px'}} onClick={() => handleClick('edit', data)}>编辑</Button>
            <Popconfirm
              tilte="提示"
              descripint="此操作将删除该用户，是否继续"
              okText="确认"
              cancelText="取消"
              onConfirm={() => handleDelete(data)}
            >
              <Button type='primary' danger>删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  return (
    <div className="user">
      <div className="flex-box space-between">
        <Button type="primary" onClick={() => handleClick('add')}>+新增</Button>
        <Form
          layout="inline"
          onFinish={handleFinish}
        >
          <Form.Item name="keyword">
            <Input placeholder="请输入用户名"/>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">搜索</Button>
          </Form.Item>
        </Form>
      </div>

      <Table columns={columns} dataSource={tableData} rowKey={"id"}/>
      {/* 编辑、新增用户的弹窗*/}
      <Modal
        open={modalOpen}
        title={modalType ? "编辑用户" : "新增用户"}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        dfdfd
      </Modal>
    </div>
  )
}
export default User;