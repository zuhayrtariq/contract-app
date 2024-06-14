import React, { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig,animate,motion, useMotionValue, useTransform } from 'framer-motion';

const ProgressBar = ({percentage = 70}) => {
 
  return (
    <motion.progress className="progress progress-primary "  value={percentage}  max={'100'}  
    role="progressbar">
    </motion.progress>
    
  )
}

export default ProgressBar