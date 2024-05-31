import { useState, useEffect,useContext } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/SidebarJournal'
import Event from './components/Event'
import Todo from './components/Todo'
import Route from './Route'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Profile from './components/Profile'
// import {  } from 'react'
import { userIdContext } from './context/context'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'



function App() {
  const router  = createBrowserRouter([
    {
      path:"/",
      element:<><div>Home page</div></>
    },
    {
      path:'/login',
      element:<><Login/></>
    },
    {
      path:'/Route',
      element:<><Navbar/><Route/></>
    },
    {
      path:'/journal',
      element:<><Navbar/><Sidebar/></>
    },
    {
      path:'/event',
      element:<><Navbar/><Event/></>
    },
    {
      path:'/todo',
      element: <><Navbar/><Todo/></>
    },
    {
      path:'/register',
      element:<><Register/></>
    },
    {
      path:'/home',
      element:<><Navbar/><Home/></>
    },
    {
      path:'/profile',
      element:<><Navbar/><Profile/></>
    },


  ])
  const [c, setC] = useState(-1)
  const [sD, setSD] = useState([]);

  return (
    <>
    <userIdContext.Provider value={{c,setC}}>
    <RouterProvider router={router}/>
    
    </userIdContext.Provider>
    </>
  )
}

export default App
