import React, { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig,motion } from 'framer-motion';

const RadicalProgress = ({percentage = 70}) => {

  return (
    <motion.div className="radial-progress bg-secondary text-secondary-content border-2 border-secondary " initial={{ '--value':0, "--size": "60px" }}
    animate={{ "--value": percentage}}   transition={{ duration: 3 }}
    role="progressbar">{percentage}%
    
    </motion.div>
    
  )
}

export default RadicalProgress