import React from 'react'
  
import {  RouterProvider, createBrowserRouter} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Sign from './pages/Sign.jsx'
import Home from './pages/Home.jsx'


const App = () => {
 
   const router = createBrowserRouter([
    {
      path:'/',
      element:<Home/>,
    },
    {
      path:'/login',
      element:<Login/>,
    },
    {
      path:'/register',
      element:<Sign/>,
    }
   ])
   
  return (
    <RouterProvider router={router}/>
  )
}

export default App
