import React from 'react'

import HomePage from './pages/Homepage/HomePage';
import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import ListPage from './pages/listPage/ListPage';
import {Layout,  RequireAuth } from './pages/layout/Layout';
import SinglePage from './pages/singlePage/SinglePage';
import ProfilePage from './pages/profilepage/ProfilePage';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import ProfileUpdatePage from './pages/profileUpdatePage/ProfileUpdatePage';
import NewPostPage from './pages/newPostPage/NewPostPage';
import { listPageLoader, profilePageLoader, singlePageLoader } from './lib/loaders';




function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/list",
          element:<ListPage/>,
          loader:listPageLoader,
        },
        {
          path:"/:id",
          element:<SinglePage/>,
          loader:singlePageLoader
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/login",
          element:<Login/>
        }
      ]
    },
    {
      path:"/",
      element:<RequireAuth/>,
      children:[
        {
          path:"/profile",
          element:<ProfilePage/>,
          loader:profilePageLoader
        },
        {
          path:"/profile/update",
          element:<ProfileUpdatePage/>
        },
        {
          path:"/add",
          element:<NewPostPage/>
        }
      ]
    },
    
  ])
  return (
    
    <RouterProvider router={router}/>
  )
}

export default App
