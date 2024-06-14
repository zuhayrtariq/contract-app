import React from 'react'
import { useGetContractsValueQuery } from '../../store/store';
import SectionCostCard from './SectionCostCard';


const DashboardCostCards = () => {
    const {data,error,isLoading,isSuccess} = useGetContractsValueQuery();

    const sections = ['PNI','PTA','PBA','PBO'];
    let sortedData = []
    if(!isLoading && isSuccess)
    {
      sortedData = data.filter(x=>sections.includes(x.sectionCode))
      sortedData.sort((a,b) =>{
      
        return sections.indexOf(a.sectionCode) - sections.indexOf(b.sectionCode)})
     
    }
  if(!isLoading && isSuccess)
  return (
    <div className="grid grid-cols-2 gap-4 w-full  justify-items-center ">
      {
        sections.map((x,i) =>{
          return(
            <div key={i} className={`${(i==2 || i==3) && ' place-self-center '}`}>

              <SectionCostCard key={i} sectionCode={sortedData[i].sectionCode} totalAmount={sortedData[i].totalValue} utilizedValue={sortedData[i].totalUtilizedValue} remainingValue={sortedData[i].totalRemainingValue}/>
            </div>
          )
        })
      }
    </div>
  )
}

export default DashboardCostCards