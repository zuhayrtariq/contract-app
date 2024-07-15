import React, { useContext } from 'react'
import { compareDates, convertDateMMMFormat, getDateAfter } from '../../hooks/date.hook'
import { formatToCurrency } from '../../hooks/formatToCurrency.hook'
import ProgressBar from '../progress-bar/ProgressBar'
import { ModalDataContext } from '../../context/ModalDataContext'
import { useGetRequisitionQuery } from '../../store/store'
import { requisitionApi } from '../../store/apis/requisitionApi'
import { Link } from 'react-router-dom'
import { copyText } from '../../hooks/copyText.hook'

const ContractPageModal = () => {
  
  const {modalData : data,modalName} = useContext(ModalDataContext);
  const dateAfter7months = getDateAfter(7,'months');
  const isExpiring = compareDates(dateAfter7months,data.endDate,'YYYY-MM-DD');
  let path = import.meta.env.VITE_FILES_URL + "/Contracts/";
  
  return (

  <div className='w-full '>

    <div className='mb-4'>
    <h1 className="font-bold flex w-full items-center justify-center text-xl uppercase text-primary">
        Contract Form
      </h1>
      <hr />
    </div>
    
    <div className="flex  justify-between  items-center mb-4">
   
        <div className="join  flex items-center justify-center  font-bold  text-center">
          <div className="p-2 bg-primary text-primary-content w-[150px] join-item" >
            Contract No.
          </div>
          <div className="p-2 join-item bg-base-300 w-[150px] cursor-copy hover:underline" onClick={()=>copyText(data.contractNo)}>{data.contractNo} </div>
          <Link to={import.meta.env.VITE_FILES_URL + `/Contracts/${data.sectionCode}/Contract ${data.contractNo}/`} target="_blank" className="py-2 bg-accent text-accent-content join-item  px-1 cursor-pointer hover:underline"
          
          >Open</Link>
        </div>
        <div className="join  flex items-center justify-center  font-bold  text-center">
          <div className="p-2 bg-primary text-primary-content w-[100px] join-item">
            Section
          </div>
          <div className="p-2 join-item bg-base-300 w-[80px]">{data.sectionCode}</div>
        </div>
        <div className="join  flex items-center justify-center  font-bold  text-center">
          <div className="p-2 bg-primary text-primary-content w-[150px] join-item">
            Requisition No.
          </div>
          <div className="p-2 join-item bg-base-300 w-[120px] cursor-copy hover:underline" onClick={()=>copyText(data.reqNo)} >{data.reqNo || 'N/A'}</div>
        </div>
      
      </div>

   



    


      <div className="flex w-full mb-4">
        <div className="bg-primary p-2 w-[156px] text-center justify-center font-bold text-primary-content rounded flex items-center">
          Contract Title
        </div>

        <div className="grow bg-base-300 flex items-center pl-4">
          {data.title}
        </div>
      </div>

      <div className="flex w-full mb-4">
        <div className="bg-primary p-2 w-[156px] text-center justify-center font-bold text-primary-content rounded flex items-center">
          Vendor Name
        </div>

        <div className="grow bg-base-300 flex items-center pl-4">
          {data.vendorCode} {data.vendorName}
        </div>
      </div>


    <div className='flex gap-x-8 mb-4'>
    <div className="flex w-full mb-4">
        <div className="bg-primary p-2 w-[156px] text-center justify-center font-bold text-primary-content rounded flex items-center">
          Start Date
        </div>

        <div className="grow bg-base-300 flex items-center pl-4">
          {convertDateMMMFormat(data.startDate)}
        </div>
      </div>

      <div className="flex w-full mb-4">
        <div className="bg-primary p-2 w-[156px] text-center justify-center font-bold text-primary-content rounded flex items-center">
          End Date
        </div>

        <div className={`grow bg-base-300 flex items-center pl-4 font-bold ${isExpiring && 'text-error'}` }>
          { convertDateMMMFormat(data.endDate) }
        </div>
      </div>
    </div>

    <div className=' mb-4'>
   
    
    
    <div className="flex w-full  mb-4 items-center justify-around gap-x-4">
        <div className="w-1/3 max-w-[180px] bg-base-300 rounded overflow-hidden ">
          <div className="  font-bold bg-primary text-primary-content p-1 flex w-full justify-center  items-center ">
            Total Amount
          </div>

          <div className="  py-1 flex w-full justify-center  items-center  ">
          { formatToCurrency(data.contractTRXValue,data.contractCurrency) }
          </div>
        </div>
        <div className="w-1/3 max-w-[180px] bg-base-300 rounded overflow-hidden">
          <div className=" font-bold bg-primary text-primary-content p-1 flex w-full justify-center  items-center">
            Utilized Amount
          </div>

          <div className="  py-1 flex w-full justify-center  items-center  ">
          { formatToCurrency(data.contractTRXValue - data.contractOpenValue,data.contractCurrency) }
          </div>
        </div>
        <div className="w-1/3 max-w-[180px] bg-base-300 rounded overflow-hidden">
          <div className=" font-bold bg-primary text-primary-content p-1 flex w-full justify-center  items-center">
            Remaining Amount
          </div>

          <div className="  py-1 flex w-full justify-center  items-center text-primary font-bold ">
          { formatToCurrency(data.contractOpenValue,data.contractCurrency) }
          </div>
        </div>
      </div>
   

       
       {/* <ProgressBar percentage={((data.contractTRXValue - data.contractOpenValue) / data.contractTRXValue * 100)} /> */}
  
    </div>
    <div className="w-full bg-base-300 rounded overflow-hidden">
          <div className=" font-bold bg-primary text-primary-content p-1 flex w-full justify-center  items-center">
            Notes
          </div>

          <div className="text-base px-4  py-2 min-h-[40px] ">
            {data.notes || 'No Notes.'}
          </div>
        </div>
    </div>

  )
}

export default ContractPageModal