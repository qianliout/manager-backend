import Mock from 'mockjs'

import homeApi from '../api/mockServeData/home'
import userApi from '../api/mockServeData/user'

Mock.mock('/home\/getData', homeApi.getStatisticalData)
Mock.mock('/user\/getUser', userApi.getUserList)