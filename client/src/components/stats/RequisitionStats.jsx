import React, { useState } from 'react'
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';
const RequisitionStats = ({totalRequisitions = 57,remainingRequisitions = 0,icon =<FaFileInvoiceDollar/>}) => {
    const [animationCompleted, setAnimationCompleted] = useState(false);
    const navigate = useNavigate()
  return (
    <div className="stat cursor-pointer px-4" onClick={()=>{navigate('/requisitions')}}>
    {/* <div className="stat-figure text-4xl ">
    {icon}
    </div> */}
    <div className="stat-title text-primary-content text-lg font-bold">Requisitions</div>
    {animationCompleted ? 
    <motion.div className="stat-value"   transition={{ duration:1 }} >{totalRequisitions}</motion.div>
    : <CountUp className={`stat-value text-primary-content`}
    end={totalRequisitions}
    start={0}
    onEnd = {({})=>{
       
        setAnimationCompleted(true)
    }}

    duration={3}
    />}
   
    {remainingRequisitions == 0 && <motion.div initial={{ opacity:0 }}
    animate={{opacity:1 }}   transition={{ delay: 3,duration:1 }} className="stat-desc text-primary-content">All requisition raised</motion.div>}
    {remainingRequisitions == 1 && <motion.div initial={{ opacity:0 }}
    animate={{opacity:1 }}   transition={{ delay: 3,duration:1 }} className="stat-desc text-error font-bold">1 requisition remaining</motion.div>}
    {remainingRequisitions > 1 && <motion.div initial={{ opacity:0 }}
    animate={{opacity:1 }}   transition={{ delay: 3,duration:1 }} className="stat-desc text-error font-bold">{remainingRequisitions} requisitions remaining</motion.div>}
  </div>
  )
}

export default RequisitionStats