import React, { useState } from 'react'
import {  FaFilePowerpoint } from "react-icons/fa6";
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';
const CoffStats = ({totalCoffs = 114,activeCoffs = 114,icon =<FaFilePowerpoint/>}) => {
    const [animationCompleted, setAnimationCompleted] = useState(false);
    const navigate = useNavigate()
  return (
    <div className="stat border-r-4 cursor-pointer px-4" onClick={()=>{navigate('./call-offs')}}>
    {/* <div className="stat-figure text-4xl ">
    {icon}
    </div> */}
    <div className="stat-title text-primary-content text-lg font-bold">Active Call-offs</div>
    {animationCompleted ? 
    <motion.div className="stat-value"   transition={{ duration:1 }} >{totalCoffs}</motion.div>
    : <CountUp className={`stat-value text-primary-content`}
    end={totalCoffs}
    start={totalCoffs - 30}
    onEnd = {({})=>{
     
        setAnimationCompleted(true)
    }}

    duration={3}
    />}
   
    {<motion.div initial={{ opacity:0 }}
    animate={{opacity:1 }}   transition={{ delay: 3,duration:1 }} className="stat-desc text-primary-content">{activeCoffs} call-offs are up-to-date</motion.div>}
  </div>
  )
}

export default CoffStats