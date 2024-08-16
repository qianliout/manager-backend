import {createBrowserRouter} from 'react-router-dom'

import Main from '../pages/main'
import Home from '../pages/home/index'

const router = [
    {
        path: '/',
        Component: Main,
        children: [
            {
                path: "home",
                Component: Home
            }
        ]
    }
]


export default createBrowserRouter(router)