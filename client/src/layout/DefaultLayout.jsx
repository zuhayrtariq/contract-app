import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/navbars/NavBar'
import SideBar from '../components/navbars/SideBar'

const DefaultLayout = () => {
  return (
    <div className='overflow-x-hidden'>
        <NavBar/>
        <div className="flex">
        <SideBar/>
        <div className=' w-full mr-4'>
        <Outlet/>
        </div>
        </div>
    </div>
  )
}

export default DefaultLayout