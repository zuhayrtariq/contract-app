import React, { useContext, useEffect } from 'react'
// import { PieChart } from '@mui/x-charts';
// import { pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Chart from 'chart.js/auto';
import { ModalDataContext } from '../../context/ModalDataContext';
import { ThemeContext } from '../../context/ThemeContext';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ValidityPieChart = ({heading='Contracts',data}) => {
  const {modalData,setModalData,setModalName} = useContext(ModalDataContext);

 

  
  const theme = localStorage.getItem('theme')
  let success = "oklch(" + getComputedStyle(document.querySelector(':root')).getPropertyValue('--p') +")",
  successText = "oklch(" + getComputedStyle(document.querySelector(':root')).getPropertyValue('--pc') +")",
  error="oklch(" + getComputedStyle(document.querySelector(':root')).getPropertyValue('--er') +")",
  warning="oklch(" + getComputedStyle(document.querySelector(':root')).getPropertyValue('--wa') +")";
  let modalName = '';
  if(heading == 'Contracts')
    modalName = 'contractsDataModal'
  else if(heading == 'Coffs')
    modalName = 'coffsDataModal'
  else if(heading == 'SES')
    modalName = 'sesDataModal'
  const chartData = [
    {id: 1,data : data.active?.length, label :'Active'},
    {id: 2,data : data.expiringSoon?.length, label :'Expiring Soon'},
    {id: 3,data : data.expired?.length, label :'Expired'}
  ]
 
  const options = {
    onClick: function(evt, element) {
      if (element?.length > 0) {
       
        const index = element[0].index;
        if(index == 0)
        setModalData(data.active);
      else if(index == 1)
        setModalData(data.expiringSoon);
      else if(index == 2)
        setModalData(data.expired);
      
        setModalName(modalName)
        document.getElementById('backDropModal').showModal()
      }
    },
    
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
       color: successText,
        "font.weight": 'bold',
        font: {
          size: 16,
          weight : 'bold'
      },
      display: function(context) {
      var dataset = context.dataset;
        var count = dataset.data?.length;
        var value = dataset.data[context.dataIndex];
        return value > count * 1.5;
      },
      },
     
    }
  };

return (
 
    <Doughnut
    
   data = {
    {labels: ['Active', 'Expiring Soon', 'Expired'],
    datasets: [
      {
       
        data: [data.active?.length, data.expiringSoon?.length, data.expired?.length],
        backgroundColor: [
          success,
          warning,
          error,
         
        ],
       
        hoverBorderWidth : 2,
        hoverOffset: 5,
        hoverBorderDashOffset: 10,
        spacing: 0,
        rotation: 270,
        cutout: '30%',
        borderRadius: 5,
        borderAlign: 'center',
        borderJoinStyle: 'round',
        animation: {
          animateScale : true,
        }
        
      },
      
    ],
  }
  }

  options= {options}
  plugins={[ChartDataLabels]}
    />
)
}

export default ValidityPieChart

{/* <div className='w-full h-full bg-blue-500 items-center flex justify-center'>
<PieChart
 
 colors={[success,warning,error]}
   series={[
   {
     data : chartData,
     highlightScope: { faded: 'global', highlighted: 'item' },
     faded: { innerRadius: 10, additionalRadius: -10 },
     // startAngle: -90,
     // innerRadius: 15,
     // outerRadius: 70,
     // paddingAngle: 2,
     // cornerRadius: 3, 
        
     // cx:83,
     // cy:80,
     arcLabel: (item) => `${item.value}`,
     arcLabelMinAngle: 18,
     
   },
   
 ]}
 
 slotProps={{
   
   legend: {
     hidden: true,

   },
 }}

 
 sx={{
   [`& .${pieArcLabelClasses.root}`]: {
     fill: successText,
     fontWeight: 'bold',
     fontSize: 14
   },
 }}

 onItemClick={(e,params)=>{
   const {dataIndex} = params;
   if(dataIndex == 0)
   setModalData(data.active);
 else if(dataIndex == 1)
   setModalData(data.expiringSoon);
 else if(dataIndex == 2)
   setModalData(data.expired);
 
   setModalName(modalName)
   document.getElementById('backDropModal').showModal()
  
 }}

 
/>
   </div> */}