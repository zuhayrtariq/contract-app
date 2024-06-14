import React from 'react'
import ValidityPieChart from './ValidityPieChart'

const PieChartsGrid = () => {
  return (
    <div className="p-4 grid w-fit grid-cols-2 gap-x-6 shadow-xl  rounded-lg b">
        
    <div className='text-center flex flex-col  w-[200px] h-[200px]      rounded-none'>
     <h1 className='text-lg font-bold bg-secondary'>Contracts</h1>
      <ValidityPieChart/>
      
    </div>
    
    <div className='text-center flex flex-col  w-[200px] h-[200px]      rounded-none'>
     <h1 className='text-lg font-bold bg-secondary'>Call-offs</h1>
      <ValidityPieChart/>
      
    </div>
  
    <div className="divider col-span-2 divider-neutral"></div> 

    <div className='text-center flex flex-col  w-[200px] h-[200px]      rounded-none'>
     <h1 className='text-lg font-bold bg-secondary'>Service Entries</h1>
      <ValidityPieChart/>
      
    </div>
    <div className='text-center flex flex-col  w-[200px] h-[200px]      rounded-none'>
     <h1 className='text-lg font-bold bg-secondary'>Requisitions</h1>
      <ValidityPieChart/>
      
    </div>

    </div>
  )
}

export default PieChartsGrid