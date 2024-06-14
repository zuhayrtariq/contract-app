import React, { useContext, useState } from 'react'

import { FaChevronDown, FaChevronUp, FaDatabase, FaFileContract, FaFileInvoice, FaFileInvoiceDollar, FaFilePowerpoint } from "react-icons/fa6";
import { MdArrowDropDown, MdDashboard } from "react-icons/md";
import { AnimatePresence, MotionConfig,easeIn,motion } from 'framer-motion';
import { Link, useLocation, useParams } from 'react-router-dom';
import { SideBarContext } from '../../context/SideBarContext';

const Sidebar = () => {
    const location = useLocation();
    const { hash, pathname, search } = location;
    const {sideBarIsOpen,setSideBarIsOpen} = useContext(SideBarContext)
    // const [isActive, setIsActive] = useState(1)
    // const [activeSubItem, setActiveSubItem] = useState(0)
    const [showSideNav, setShowSideNav] = useState(sideBarIsOpen);
    const SideBarItems= [
        {
            id:1,
            name: "Dashboard",
            icon : <MdDashboard/>,
            path : '/'
        },
        {
          id:2,
          name: "Contracts",
          path : '/contracts',
          icon : <FaFileContract/>,
      },

      {
        id:3,
        name: "Calloffs",
        path : '/call-offs',
        icon : <FaFilePowerpoint/>,
    },

    {
      id:4,
      name: "Requisitions",
      path : '/requisitions',
      icon : <FaFileInvoiceDollar/>,
  },
    ]

    const handleSidebar = () =>{
        setSideBarIsOpen(!showSideNav)
        setShowSideNav(!showSideNav)
        localStorage.setItem('sideBarIsOpen',!showSideNav);
    }
 
   
    
    
  return (
    <AnimatePresence mode='wait'>
    <motion.div 
    animate ={showSideNav ? 'expand' : 'collapse'}
    
    variants={{
        expand: {
            width:'200px',
            transition: {
                type: 'spring',
                // ease: "easeInOut",
                duration: 0.5,
                damping: 15,
              } 
        },
        collapse:{
            width:'80px',
            transition: {
                type: 'spring',
                // ease: "easeInOut",
                duration: 0.5,
                damping: 15,
              } 
        }
    }}
    className={`bg-base-100 p-4 mr-4  shadow-xl  relative min-h-[calc(100vh-65px)]  px-4  flex flex-col `}
    
    >
    <motion.button className='absolute z-50  p-0 btn btn-primary btn-circle btn-xs  -right-3 top-10'
    data-tip="hello"
    onClick={()=>{handleSidebar()}}
     animate={showSideNav ? 'open' : 'closed'}

     variants={{
         open: {
             rotate: "270deg",
             transition: {
              duration: 0.4
            }  
         },
         closed: {
            rotate: "90deg",
             transition: {
              duration: 0.4
            }
         }
     }} >
    <FaChevronUp className='text-lg'/>
    </motion.button>
    
        
        <div className={` flex flex-col ${showSideNav && 'overflow-x-hidden'}`}>
    
            {SideBarItems.map((item,index) =>{
                return(
                <Link to={item.path} className={`mb-2 btn rounded cursor-pointer  ${pathname == item.path && 'btn-primary'} ${!showSideNav && 'tooltip tooltip-right '} 
                flex z-50 `} 
                data-tip={item.name}
                key={index} >
                           
                <div className={` rounded flex items-center justify-between w-full  cursor-pointer font-bold text-lg`}
               
               >
                    <div className='flex items-center gap-x-3'>
                    <span >{item.icon}</span>
                    <p className={`${!showSideNav && 'hidden'}`}>{item.name}</p></div>
                   
                   
                </div>

              
                </Link>)
            }) }
        </div>
    </motion.div>
                </AnimatePresence>
  )
}

export default Sidebar

/*
  <motion.div 
                animate={isActive == item.id ? 'visible' : 'hidden'}
                variants={variants}
                transition={{ type: "ease" }}
                exit={{ opacity: 0 }}
                className="sub-items  mx-4 mt-1"
                key={index}>
                
                    {item.subItems?.map((subItem,index) =>{
                        return(
                            <div
                            onClick={(e=>setActiveSubItem(subItem.id))}
                            className={`flex items-center gap-x-3 text-primary-dark  py-2 text-lg  px-4 ${activeSubItem == subItem.id ? 'border-l-4 font-bold' : 'hover:font-semibold' }`} key={index}>
                    <span>{subItem.icon}</span>
                    <p className={`${!showSideNav && 'hidden'}`}>{subItem.name}</p></div>
                        )
                    })}
                </motion.div>
                */

                /* {item.subItems && <div className={`${!showSideNav && 'hidden'}`}> <motion.p
                    animate={isActive == item.id ? 'open' : 'closed'}
                    variants={{
                        open: {
                            rotate: "180deg"
                        },
                        closed: {
                            rotate: "0deg"
                        }
                    }}
                    transition={{duration:0.2}}
                    ><FaChevronUp/></motion.p> </div>}
                    */