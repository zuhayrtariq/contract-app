import React, { useContext } from 'react'
import {  useGetCoffValidityQuery, useGetContractValidityQuery, useGetSectionRequisitionsQuery } from '../../store/store';
import { ModalDataContext } from '../../context/ModalDataContext';

const SectionDataCard = ({sectionCode= 'PNI'}) => {
  const {data:contractsValidityData} = useGetContractValidityQuery(sectionCode);
  const {data:coffValidityData} = useGetCoffValidityQuery(sectionCode);
  const {data:reqData} = useGetSectionRequisitionsQuery(sectionCode);
  

  const {setModalData,setModalName} = useContext(ModalDataContext);
  const allContracts = [];
  let contractsExpSoon,coffExpSoon, totalRequisitions=0;
  if(contractsValidityData)
  {
    const temp = Object.keys(contractsValidityData).map((key) =>{
      return contractsValidityData[key]
    })
    allContracts.push(...temp.flat())
    contractsExpSoon = contractsValidityData['expiringSoon'].length
  }
  if(coffValidityData)
    {
      coffExpSoon = coffValidityData['expiringSoon'].length
    }
    if(reqData)
      {
        totalRequisitions = reqData.length
      }
    const openModal = (modalName, data) =>{ 
      setModalName(modalName)
      setModalData(data)
      document.getElementById('backDropModal').showModal()
    }
  return (
   <div className={`bg-primary border-4 border-primary-content shadow-lg  drop-shadow-xl    text-center  text-primary-content rounded-md overflow-clip    min-w-[200px] max-w-[220px] h-[150px]`}>
    <div className="bg-secondary text-secondary-content  font-bold uppercase text-xl border-b-4 border-primary-content tracking-wider">{sectionCode}</div>
    <div className="text-primary-content">
        <div className="total-contracts  pt-0.5 font-semibold  ">
             <span className='cursor-pointer hover:underline' onClick={()=>{openModal('contractsDataModal',allContracts)}}>Total Contracts : {allContracts.length}</span> 
        </div>

        <div className=" text-xs font-semibold -mt-1">
        {contractsExpSoon > 1 && <div className="bg-gray-100 py-0.5 text-pretty text-[13px] pt-0.5 text-red-500   my-2 cursor-pointer hover:underline"
        onClick={()=>{openModal('contractsDataModal',contractsValidityData.expiringSoon)}}
        >{contractsExpSoon} Contracts Expiring Soon</div>
        }
        {contractsExpSoon == 1 && <div 
        className="bg-gray-100 py-0.5 text-pretty text-[13px] pt-0.5 text-red-500   my-2 cursor-pointer hover:underline"
        onClick={()=>{openModal('contractsDataModal',contractsValidityData.expiringSoon)}}>{contractsExpSoon} Contract 
        Expiring Soon</div>
        }
        {contractsExpSoon == 0 && <div className="bg-gray-100 py-0.5 text-pretty text-[13px] pt-0.5 text-green-500   my-2">All Contracts up-to-date</div>
        }
         {totalRequisitions > 1 && <div className="bg-gray-100 py-0.5 text-pretty text-[13px] pt-0.5 text-gray-700 cursor-pointer hover:underline   my-2"
         onClick={()=>{openModal('requisitionsDataModal',reqData)}}>{totalRequisitions} Requisitions Raised</div>
        }
        {totalRequisitions == 1 && <div className="bg-gray-100 py-0.5 text-pretty text-[13px] pt-0.5 text-gray-700 cursor-pointer hover:underline  my-2"
        onClick={()=>{openModal('requisitionsDataModal',reqData)}}>{totalRequisitions} Requisition Raised</div>
        }
        {totalRequisitions == 0 && <div className="bg-gray-100 py-0.5 text-pretty text-[13px] pt-0.5 text-black   my-2">No Active Requisitions</div>
        }
       {coffExpSoon > 1 && <div className="bg-gray-100 py-0.5 text-pretty text-[13px] pt-0.5 text-red-500   my-2 cursor-pointer hover:underline"
        onClick={()=>{openModal('coffsDataModal',coffValidityData.expiringSoon)}}
       >{coffExpSoon} Call-offs Expiring Soon</div>
        }
        {coffExpSoon == 1 && <div className="bg-gray-100 py-0.5 text-pretty text-[13px] pt-0.5 text-red-500   my-2 cursor-pointer hover:underline"
           onClick={()=>{openModal('coffsDataModal',coffValidityData.expiringSoon)}}
           >{coffExpSoon} Call-off Expiring Soon</div>
        }
        {coffExpSoon == 0 && <div className="bg-gray-100 py-0.5 text-pretty text-[13px] pt-0.5 text-green-500 my-2">All Call-offs up-to-date</div>
        }
        </div>
    </div>
   </div>
  )
}

export default SectionDataCard
