import React from 'react'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useGetContractsValueQuery } from '../../store/store';
import { numify } from "numify";
import daisyuiColors from "daisyui/src/theming/themes";
const ConsolidatedBudgetPieChart = () => {
  
  const theme = localStorage.getItem('theme')
  const {data,error,isLoading} = useGetContractsValueQuery();
 
  const chartData = [
    { value:  0, label: 'Remaining', color:daisyuiColors.acid.success },
    { value: 0, label: 'Consumed', color:daisyuiColors.acid.warning },
  ];
  let success,labelText,warning, gray = daisyuiColors.dim['base-100'];


  if(theme == 'light')
  {
   
    success = daisyuiColors.acid.success;
    labelText = daisyuiColors.acid['base-100']
    warning = daisyuiColors.acid.warning;
    
  }
  else{
    success = daisyuiColors.aqua.success;
    labelText = daisyuiColors.aqua['base-100']
    warning = daisyuiColors.aqua.warning;
  }

  if(data)
  {
   data.map(x =>{
     chartData[0].value += x.totalOpenValue; 
    chartData[1].value += x.totalUtilizedValue;
   })
  }
  return (
    <>
    {data && <PieChart
        series={[
        {
          data: chartData,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 70, additionalRadius: -10 },
          innerRadius: 80,
          outerRadius: 0,
          cx:100,
          cy:90,
          
          arcLabel: (item) => `${item.label} $${numify(item.value)}`,
        },
      ]}
      slotProps={{
        
        legend: {
          hidden: true,
          labelStyle: {
            fontSize: 12,
          },
          itemMarkWidth: 10,
      itemMarkHeight: 10,
      markGap: 5,
          direction: 'row',
          position: { vertical: 'top', horizontal: 'middle' },
          padding: 0,
        },
      }}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: labelText,
          fontWeight: 'bold',
          fontSize: 12
          
        },
      }}
    

/>}
    </>
      
      

  )
}

export default ConsolidatedBudgetPieChart