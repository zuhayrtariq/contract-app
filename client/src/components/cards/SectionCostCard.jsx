import React from 'react'
import RadicalProgress from '../progress-bar/RadicalProgress'
import { numify } from 'numify';

const SectionCostCard = ({sectionCode = 'Test',totalAmount = '12323.21',utilizedValue = '1000.2', remainingValue = '100.02' }) => {
  const percentageUsed = parseInt((utilizedValue / totalAmount) * 100);
  return (
    <div className="card !py-2 !px-2 w-1/5 bg-primary text-primary-content min-w-[190px] max-w-[280px] max-h-[180px]">
  <div className="card-body !p-0">
  <h2 className="card-title text-lg font-bold text-center flex w-full items-center bg-secondary text-secondary-content rounded-full justify-center">{sectionCode}</h2>
  <div>
    
    <h2 className="text-base font-semibold">Total Contracts Amount</h2>
    <h2 className="card-subtitle text-base font-bold  ">${numify(totalAmount)} </h2>
  </div>
    <div className="  flex w-full h-full  items-stretch mx-2">
    <div className=''>
      <RadicalProgress percentage={percentageUsed}/>
      </div>
    <div className=' w-full justify-center  items-center gap-y-1 flex flex-col  '>
    <div className="text-xs font-bold ">Utilized Amount </div>
    <div className="badge badge-primary-content text-primary badge-lg text-xs font-bold">${numify(utilizedValue)}</div>

       
    </div>
    </div>
    
  </div>
</div>
  )
}

export default SectionCostCard