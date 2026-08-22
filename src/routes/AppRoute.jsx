import React from 'react'
import MainLayouts from '../layouts/MainLayouts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/user/Home'
import Properties from '../pages/user/Properties'
import NotFound from '../pages/error/NotFound'
import ServerError from '../pages/error/ServerError'
import RoomDetails from '../pages/user/RoomDetails'
import About from '../pages/user/About'
import Contact from '../pages/user/Contact'

const route = createBrowserRouter([
    {
        path: "/",
        element: <MainLayouts/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "properties",
                element: <Properties/>
            },
            {
                path: "properties/details/:id",
                element: <RoomDetails/>
            },
            {
                path: "about",
                element: <About/>
            },
            {
                path: "contact",
                element: <Contact/>
            }
        ]
    },
    {
        path: "/errorServer",
        element: <ServerError/>
    },
    {
        path: "/*",
        element: <NotFound/>
    }
])

const AppRoute = () => {
  return (
    <RouterProvider router={route}>

    </RouterProvider>
  )
}

export default AppRoute