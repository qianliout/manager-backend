import Mock from 'mockjs'

import homeApi from '../api/mockServeData/home'

Mock.mock('/home\/getData', homeApi.getStatisticalData)