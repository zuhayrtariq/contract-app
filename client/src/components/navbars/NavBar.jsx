import React, { useContext } from 'react'
import { Badge, Button, Dropdown, Form, Input, Navbar } from 'react-daisyui'
import ThemeController from '../theme-toggle/ThemeController'
import logo from '../../assets/logo-without-bg.png'
import { AdminContext } from '../../context/AdminContext'
import { useAdminLogoutMutation } from '../../store/apis/LoginApi'
const NavBar = () => {
  const {isAdmin,setIsAdmin} = useContext(AdminContext);
  const [logout,results] = useAdminLogoutMutation();
  const handleLogout = async() =>{
    const temp = await logout().unwrap();
   
    if(temp)
    {
      setIsAdmin(false)
      localStorage.setItem('isAdmin',false)
    }
  } 
  return (
    <Navbar className='bg-base-100 px-4 py-2 shadow-xl round-box flex h-[65px]' >
      <div className="flex-1 flex items-center ">
       
        
            <img src={logo} alt="Prime Pakistan" className="w-[50px] bg-red-4" />
            <h1 className={`font-bold text-xl text-primary-light `}>Prime <span className="text-primary">Pakistan</span> </h1>
       
        
        

      </div>
      <div className="flex-none gap-2 flex items-center">
       
        
        <div className='flex items-center gap-x-8 justify-center'>
        {
          isAdmin ? 
          <button className='btn btn-xs btn-primary' onClick={handleLogout}>Admin</button>
        :
        <button className='btn btn-sm' onClick={()=>{document.getElementById('loginModal').show()}}>Login</button>
        }
        <ThemeController/>
        </div>
      </div>
    </Navbar>

  )
}

export default NavBar