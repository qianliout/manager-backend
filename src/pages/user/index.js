import React, {useEffect, useState} from "react"
import {Button, Form, Input, Table, Popconfirm, Modal, InputNumber, Select, DatePicker} from 'antd'

import './user.css'
import {getUser, addUser, editUser, deleteUser} from '../../api'
import dayjs from 'dayjs'


const User = () => {
  const [listData, setListData] = useState({name: ''})
  const [tableData, setTableData] = useState([]);
  const [modalType, setModalType] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm()

  const handleClick = (type, rowData) => {
    console.log('handle click', type, rowData)
    setModalOpen(!modalOpen)
    if (type === 'add') {
      setModalType(0)

    } else {
      setModalType(1)
      const cloneData = JSON.parse(JSON.stringify(rowData)) // deep copy
      cloneData.birth = dayjs(cloneData.birth)
      // 表单数据的回填
      form.setFieldsValue(cloneData)
    }
  }
  const handleDelete = ({id}) => {
    deleteUser({id}).then(() => {
      getTableData()
    })
  }
  // 提交
  const handleFinish = (e) => {
    console.log("eeee", e)
    setListData({name: e.keyword})
    // 不能直接这样写，因为 setListData 是异步的，第一次拿到的还是老数据
    // getTableData()
  }
  // 监听listData,当 listData 改变时调用方法，更新列表
  useEffect(() => {
    console.log("搜索变动后执行了", listData)
    getTableData()
  }, [listData]);


  // 获取用户数据
  const getTableData = () => {
    getUser(listData).then(({data}) => {
      console.log("搜索参数:", listData.name)
      setTableData(data.list)
    })
  }
  const handleOk = () => {
    form.validateFields().then((va) => {
        va.birth = dayjs(va.birth).format('YYYY-MM-DD')
        if (modalType) {
          // 编辑
          editUser(va).then(() => {
            handleCancel() // 关闭弹窗
            getTableData() // 更新列表数据（重新请求一下接口）
          })
        } else {
          addUser(va).then(() => {
            handleCancel() // 关闭弹窗
            getTableData() // 更新列表数据（重新请求一下接口）
          })
        }
      }
    )
  }
  const handleCancel = () => {
    setModalOpen(false);
    form.resetFields() // 清空表单的数据
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

      <Table style={{marginTop: '10px'}} columns={columns} dataSource={tableData} rowKey={"id"}/>
      {/* 编辑、新增用户的弹窗*/}
      <Modal
        open={modalOpen}
        title={modalType ? "编辑用户" : "新增用户"}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          labelCol={{span: 6}}
          wrapperCol={{span: 18}}
          labelAlign="left"
        >
          {
            modalType == 1 && <Form.Item name="id" hidden>
              <Input/>
            </Form.Item>
          }


          <Form.Item
            label="姓名"
            name="name"
            rules={
              [
                {
                  required: true,
                  message: "请输入姓名"
                }
              ]
            }
          >
            <Input placeholder="请输入姓名"/>
          </Form.Item>


          <Form.Item
            label="年龄"
            name="age"
            rules={
              [
                {
                  required: true,
                  message: "请输入年龄"
                },
                {
                  type: Number,
                  message: "年龄必须是数字"
                }
              ]
            }
          >
            <InputNumber placeholder="请输入年龄"/>
          </Form.Item>

          <Form.Item
            label="性别"
            name="sex"
            rules={
              [
                {
                  required: true,
                  message: "请输入性别"
                },
                {
                  type: Number,
                  message: "年龄必须是数字"
                }
              ]
            }
          >
            <Select placeholder="请选择性别"
                    options={[
                      {value: 0, label: "男"},
                      {value: 1, label: "女"}
                    ]}
            />
          </Form.Item>
          <Form.Item
            label="出生日期"
            name="birth"
            rules={
              [
                {
                  required: true,
                  message: "请输入出生日期"
                }
              ]
            }
          >
            <DatePicker placeholder="请选择出生日期" format="YYYY/MM/DD"/>
          </Form.Item>

          <Form.Item
            label="地址"
            name="addr"
            rules={
              [
                {
                  required: true,
                  message: "请输入地址"
                }
              ]
            }
          >
            <Input placeholder="请输入地址"/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
export default User;