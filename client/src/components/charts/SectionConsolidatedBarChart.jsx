import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useGetCoffValidityQuery, useGetContractValidityQuery } from '../../store/store';
import daisyuiColors from "daisyui/src/theming/themes";

export default function SectionConsolidatedBarChart() {
  const theme = localStorage.getItem('theme')
  let success,error,warning, gray = daisyuiColors.dim['base-100'];
  const {data: contractDataPNI} = useGetContractValidityQuery('PNI');
  const {data: contractDataPTA} = useGetContractValidityQuery('PTA');
  const {data: contractDataPBA} = useGetContractValidityQuery('PBA');
  const {data: contractDataPBO} = useGetContractValidityQuery('PBO');

  const {data: coffDataPNI} = useGetCoffValidityQuery('PNI');
  const {data: coffDataPTA} = useGetCoffValidityQuery('PTA');
  const {data: coffDataPBA} = useGetCoffValidityQuery('PBA');
  const {data: coffDataPBO} = useGetCoffValidityQuery('PBO');
  let isLoading = true;
  const chartData = []
  if(contractDataPBA && contractDataPNI && contractDataPTA && contractDataPBO
    && coffDataPBA && coffDataPNI && coffDataPTA && coffDataPBO)
    {
      isLoading = false;
      chartData.push({
        
        "name": "Contracts",
        
        "activeContracts": contractDataPNI.active?.length,
        "contractsExpSoon": contractDataPNI.expiringSoon?.length,
        "contractsExpired": contractDataPNI.expired?.length,
       

        
      
       
    
    },
    {
        
      "name": "Call-offs",
      
      "activeCallOffs": coffDataPNI.active?.length,
      "coffsExpiringSoon": coffDataPNI.expiringSoon?.length,
      "coffsExpired": coffDataPNI.expired?.length,
     
  },
 
{
      
  "name": "Service Entries",
  
  "activeSES": coffDataPNI.active?.length,
  "SESExpiringSoon": coffDataPNI.expiringSoon?.length,
  "SESExpired": coffDataPNI.expired?.length,
 

})

    
  }
  if(theme == 'dark')
    {
     
      success = daisyuiColors.acid.success;
      error = daisyuiColors.acid.error;
      warning = daisyuiColors.acid.warning;
      
    }
    else{
      success = daisyuiColors.aqua.success;
      error = daisyuiColors.halloween.error;
      warning = daisyuiColors.halloween.warning;
    }
  
  return (
    <>
    {!isLoading && <BarChart
      className=''
    
      dataset={chartData}
      
      xAxis={[{ scaleType: 'band', dataKey: 'name' }]}
      
     
      series={[
        { dataKey: 'activeContracts',  color:success, label: 'Active Contracts'},
        { dataKey: 'contractsExpSoon',  color:warning, label: 'Contracts Expiring Soon'},
        { dataKey: 'contractsExpired', color:error, label: 'Expired Contracts'},

        { dataKey: 'activeCallOffs', color:success, label: 'Active Call-offs'},
        { dataKey: 'coffsExpiringSoon', color:warning, label: 'Call-offs Expiring Soon'},
        { dataKey: 'coffsExpired', color:error, label: 'Expired Call-offs'},           
      ]}
      slotProps={{
        
        legend: {
          hidden: true,
          labelStyle: {
            fontSize: 14,
          },
          itemMarkWidth: 10,
      itemMarkHeight: 10,
      markGap: 5,
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'right' },
          padding: 0,
        },
      }}
    />}
    </>
  );
}