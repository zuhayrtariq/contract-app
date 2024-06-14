import React, { useContext, useEffect } from 'react'
import ValidityPieChart from './ValidityPieChart'
import { useGetCoffValidityQuery, useGetContractValidityQuery } from '../../store/store';
import { useGetSESValidityQuery } from '../../store/apis/coffApi';
import { ThemeContext } from '../../context/ThemeContext';

const DashboardValidityCharts = () => {
  const {data:contractsValidityData} = useGetContractValidityQuery();

  
  const {data:coffValidityData} = useGetCoffValidityQuery();

  
  const {data:sesValidityData} = useGetSESValidityQuery();
  const {isDarkContext}= useContext(ThemeContext);
  useEffect(()=>{
  },[isDarkContext])
  return (
    // <div className='flex flex-wrap gap-y-4 w-full '>
    //     <div className="w-1/2 px-4 h-[150px]">
    //     <h1 className='text-lg bg-secondary text-secondary-content font-bold text-center w-full rounded border-2 border-primary mb-1'>Contracts</h1>
    //     {
    //       contractsValidityData && <ValidityPieChart heading='Contracts' data = {contractsValidityData}/>
    //     }
        
    //     </div>
    //     <div className="w-1/2 px-4 h-[150px]">
    //     <h1 className='text-lg bg-secondary text-secondary-content font-bold text-center w-full rounded border-2 border-primary mb-1'>Call-offs</h1>
        
    //      {
    //       coffValidityData && <ValidityPieChart heading='Coffs' data = {coffValidityData}/>
    //     }
    //     </div>
    //     <div className="w-full flex justify-center items-center ">
    //         <div className="h-[150px] w-1/2 ">
    //         <h1 className='text-lg bg-secondary text-secondary-content font-bold text-center w-full rounded border-2 border-primary mb-1'>Service Entries</h1>
        
    //      {
    //       sesValidityData && <ValidityPieChart heading='SES' data = {sesValidityData}/>
    //     }
    //         </div>
    //     </div>
        
    // </div>

    <div className='grid grid-cols-2 gap-y-4 gap-x-2'>
      <div className='px-8 max-w-[230px]'>
           <h1 className='text-lg bg-secondary text-secondary-content font-bold text-center w-full rounded border-2 border-primary mb-1'>Contracts</h1>
         {
           contractsValidityData && <ValidityPieChart heading='Contracts' data = {contractsValidityData}/>
         }
        
      </div>
      <div className='px-8 max-w-[230px]'>
           <h1 className='text-lg bg-secondary text-secondary-content font-bold text-center w-full rounded border-2 border-primary mb-1'>Call-offs</h1>
         {
           coffValidityData && <ValidityPieChart heading='Coffs' data = {coffValidityData}/>
         }
        
      </div>
      <div className='col-span-2 justify-self-center  w-1/2'>
        <div className='px-8 max-w-[230px]'>
        <h1 className='text-lg bg-secondary text-secondary-content font-bold text-center w-full rounded border-2 border-primary mb-1 '>Services</h1>
         {
           sesValidityData && <ValidityPieChart heading='SES' data = {sesValidityData}/>
         }
        </div>
          
        
      </div>
      <div>

      </div>
      <div>

      </div>
    </div>
  )
}

export default DashboardValidityCharts