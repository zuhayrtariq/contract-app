import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { TailSpin } from 'react-loader-spinner';
const ContractsMonthlyExp = ({year}) => {
    const [contractExpData,setContractExpData] = useState([])
    const [loadedData,setLoadedData] = useState(false)
    // const [year, setYear] = useState(2024);
   
    const getExpContractsData = async () => {
        let{ data } = await axios.get('/contract-exp-by-year',{
        params: {year: year}});
        setContractExpData(data)
       
      };
      useEffect(()=>{
        (async () => {
            setLoadedData(false)
            await getExpContractsData()
            setLoadedData(true)
          })();
    },[year])

   
  return (
    <>
    {loadedData ? 
    
     <BarChart
     colors={['green']}
    
      dataset={contractExpData}
      
      xAxis={[{ scaleType: 'band', dataKey: 'month',label: "Months" }]}
      yAxis= {[
        {
          label: 'Contracts Expiring',
        },
      ]}
      series={[
        { dataKey: 'expContracts', label: 'Expiring Contracts'},
       
      ]} slotProps={{
        legend: {
          labelStyle: {
            fontSize: 14,
          },
          itemMarkWidth: 10,
      itemMarkHeight: 10,
      markGap: 5,
         
        },
      }}
      
    />
:
<TailSpin
  height="200"
  // width="400"
  color="green"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
}
    </>
  )
}

export default ContractsMonthlyExp