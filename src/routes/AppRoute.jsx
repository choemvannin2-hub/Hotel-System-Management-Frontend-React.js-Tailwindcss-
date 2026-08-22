import React from 'react'
import MainLayouts from '../layouts/MainLayouts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/user/Home'
import Properties from '../pages/user/Properties'
import NotFound from '../pages/error/NotFound'
import ServerError from '../pages/error/ServerError'
import RoomDetails from '../pages/user/RoomDetails'

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
                path: "popular",
                element: <Properties/>
            },
            {
                path: "contact",
                element: <h1>Contact</h1>
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