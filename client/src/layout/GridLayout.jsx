import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/navbars/NavBar'
import SideBar from '../components/navbars/SideBar'
import GridNavBar from '../components/navbars/GridNavBar'
import ContractsDataModal from '../components/modal/ContractsDataModal'

const GridLayout = () => {
  return (
    <div className='max-h-screen h-fit'>
        {/* <NavBar/> */}
        <GridNavBar/>
        <div className="flex min-h-[calc(100vh-65px)] ">

       
        <SideBar/>
        <div className='h-[calc(100vh-73px)] w-full mt-2 mr-2'>

        <Outlet/>
        </div>
        </div>
    </div>
  )
}

export default GridLayout