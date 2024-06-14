import React, { useContext } from 'react'
import { ModalDataContext } from '../../context/ModalDataContext';
import { convertDateMMMFormat } from '../../hooks/date.hook';

const ContractsModalTable = () => {
    
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
          <th className=' '>Contracts No.</th>
          <th className=' '>Title</th>
          <th className=' '>End Date</th>
          <th className=' '>Req No.</th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
    {
        modalData.map((x,i) =>{
            return(
                <tr className={`hover`} key={i}>
          <td>{i+1}</td>
          <td>{x.sectionCode}</td>
          <td>{x.contractNo}</td>
          <td>{x.title}</td>
          <td>{ convertDateMMMFormat(x.endDate)}</td>
          <td>{x.reqNo || 'N/A'}</td>
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

export default ContractsModalTable