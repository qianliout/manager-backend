import {createBrowserRouter, Navigate} from 'react-router-dom'

import Main from '../pages/main'
import Home from '../pages/home'
import Mail from '../pages/mail'
import User from '../pages/user'
import PageOne from '../pages/other/pageOne'
import PageTwo from '../pages/other/pageTwo'

const router = [
    {
        path: '/',
        Component: Main,
        children: [
            // redirect
            {
                path: "/",
                element: <Navigate to="/home" replace/>
            },
            {
                path: "home",
                Component: Home
            },
            {
                path: "mail",
                Component: Mail
            },
            {
                path: "user",
                Component: User
            },

            {
                path: "other",
                children: [
                    {
                        path: "pageOne",
                        Component: PageOne
                    },
                    {
                        path: "pageTwo",
                        Component: PageTwo
                    }
                ],
            }
        ]
    }
]

export default createBrowserRouter(router)