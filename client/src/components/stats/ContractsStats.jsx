import React, { useState } from 'react'
import { FaFileContract } from "react-icons/fa6";
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';
const ContractsStats = ({totalContracts = 57,activeContracts = 54,icon =<FaFileContract/>}) => {
    const navigate = useNavigate();
    const [animationCompleted, setAnimationCompleted] = useState(false)
  return (
    <div className="stat cursor-pointer px-4" onClick={()=>{navigate('./contracts')}}>
    {/* <div className="stat-figure text-4xl ">
    {icon}
    </div> */}
    <div className="stat-title text-primary-content text-lg font-bold">Total Contracts</div>
    {animationCompleted ? 
    <motion.div className="stat-value"   transition={{ duration:1 }} >{totalContracts}</motion.div>
    : <CountUp className={`stat-value text-primary-content`}
    end={totalContracts}
    start={totalContracts - 30}
    onEnd = {({})=>{
        setAnimationCompleted(true)
    }}

    duration={3}
    />}
   
    {<motion.div initial={{ opacity:0 }}
    animate={{opacity:1 }}   transition={{ delay: 3,duration:1 }} className="stat-desc text-primary-content">{activeContracts} contracts are up-to-date</motion.div>}
  </div>
  )
}

export default ContractsStats