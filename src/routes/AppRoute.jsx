import React from 'react'
import MainLayouts from '../layouts/MainLayouts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/user/Home'

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
                element: <h1>All rooms</h1>
            },
            {
                path: "popular",
                element: <h1>Popular</h1>
            },
            {
                path: "contact",
                element: <h1>Contact</h1>
            }
        ]
    }
])

const AppRoute = () => {
  return (
    <RouterProvider router={route}>

    </RouterProvider>
  )
}

export default AppRoute