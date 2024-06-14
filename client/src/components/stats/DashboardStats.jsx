import React from 'react'
import ContractsStats from './ContractsStats'
import CoffStats from './CoffStats'
import RequisitionStats from './RequisitionStats'
import { useGetTotalDataQuery } from '../../store/store'

const DashboardStats = () => {
  const {data,error,isLoading} = useGetTotalDataQuery();

  return (
   
    <div className='flex items-center  h-full'>
      {data &&  <div className="stats stats-vertical shadow bg-primary ">
        <ContractsStats totalContracts={data.totalContracts} activeContracts={data.activeContracts}/>
        <CoffStats totalCoffs={data.totalCallOffs} activeCoffs={data.activeCallOffs}/>
        <RequisitionStats totalRequisitions={data.totalRequisitions} remainingRequisitions={data.remainingRequisitions}/>
        </div>}
       

    </div>
  )
}

export default DashboardStats