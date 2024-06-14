import React, { useContext } from 'react'
import { ModalDataContext } from '../../context/ModalDataContext';
import { convertDateMMMFormat } from '../../hooks/date.hook';
import { formatToCurrency } from '../../hooks/formatToCurrency.hook';

const RequisitionsModalTable = () => {
    
  const {modalData} = useContext(ModalDataContext);

  
  return (
    <>  
    {modalData &&   <div className="overflow-x-auto ">
    <table className="table table-zebra text-center">
      {/* head */}
      <thead className='font-bold text-sm text-primary  '>
        <tr>
        <th className=' '>#</th>
        <th className=' '>Section</th>
        <th className=' '>Requisition No.</th>
          <th className=' '>Title</th>
          <th className=' '>Requisition ACV</th>
          <th className=' '>Requisition Date</th>
          <th className=' '>Type</th>
          <th className=' '>Buyer Name</th>
        </tr>
      </thead>
      <tbody>
    {
        modalData.map((x,i) =>{
            return(
                <tr className="hover" key={i}>
          <td>{i+1}</td>
          <td>{x.sectionCode}</td>
          <td >{x.reqNo}</td>
          <td>{x.title}</td>
          <td>{ formatToCurrency(x.reqACV) }</td>
          <td>{ convertDateMMMFormat(x.reqDate)}</td>
          <td>{x.reqType}</td>
          <td>{x.buyerName}</td>
        </tr>
            )
        })
    }

       
      </tbody>
    </table>
  </div>}
  
    </>
  
  )
}

export default RequisitionsModalTable