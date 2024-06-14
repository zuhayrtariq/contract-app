import React from 'react'
import { Badge, Button, Dropdown, Form, Input, Navbar } from 'react-daisyui'
import ThemeController from '../theme-toggle/ThemeController'
import logo from '../../assets/logo-without-bg.png'
import { useLocation, useParams } from 'react-router-dom'
const GridNavBar = () => {
  const {pathname} = useLocation();

  return (
    <Navbar className='bg-base-100 px-4 py-1   shadow-xl round-box flex h-[65px]' >
      <div className="flex items-center w-[300px] ">
       
        
            <img src={logo} alt="Prime Pakistan" className="w-[50px] bg-red-4" />
            <h1 className={`font-bold text-xl text-primary-light `}>Prime <span className="text-primary">Pakistan</span> </h1>
       
        
        

      </div>

      <div className='items-center flex  w-full justify-center'>
      <h1 className={`font-bold text-2xl text-primary-light text-primary uppercase `}>{pathname.substring(1,pathname?.length)}</h1>
       
      </div>

      <div className="flex-none gap-2 flex items-center">
        
       
        <div className='flex items-center justify-center'>

        <ThemeController/>
        </div>
      </div>
    </Navbar>

  )
}

export default GridNavBar