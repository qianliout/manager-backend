import Mock from 'mockjs'

import homeApi from '../api/mockServeData/home'
import userApi from '../api/mockServeData/user'

Mock.mock('/home\/getData', homeApi.getStatisticalData)
Mock.mock('/user\/getUser/', 'get', userApi.getUserList)
Mock.mock('/user\/getUser?name=', 'get', userApi.getUserList)
Mock.mock('/user\/getUser?name=万平', 'get', userApi.getUserList)
Mock.mock('/user\/addUser', 'post', userApi.createUser)
Mock.mock('/user\/editUser', 'post', userApi.updateUser)
Mock.mock('/user\/deleteUser', 'post', userApi.deleteUser)