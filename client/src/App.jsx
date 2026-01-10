import React from 'react'
  
import {  RouterProvider, createBrowserRouter} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Sign from './pages/Sign.jsx'
import Home from './pages/Home.jsx'
import Jobs from './pages/Job.jsx'
import Profile from './pages/Profile.jsx'


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
    },{
       path:'/jobs',
      element:<Jobs/>,
    },{
      
       path:'/profile',
      element:<Profile/>,
    
    }
    
   ])
   
  return (
    <RouterProvider router={router}/>
  )
}

export default App
