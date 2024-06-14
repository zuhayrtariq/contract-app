import React, { useContext } from 'react'
import { ModalDataContext } from '../../context/ModalDataContext';
import { convertDateMMMFormat } from '../../hooks/date.hook';

const CoffsModalTable = () => {
  const {modalData,setModalData} = useContext(ModalDataContext);

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
        <th className=' '>Coff No.</th>
          <th className=' '>Title</th>
          <th className=' '>End Date</th>
          
          <th className=' '>Contract End Date</th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
    {
        modalData.map((x,i) =>{
            return(
                <tr className="hover" key={i}>
          <td>{i+1}</td>
          <td>{x.contract.sectionCode}</td>
          <td>{x.contractNo}</td>
          <td>{x.coffNo}</td>
          <td>{x.title}</td>
          <td>{ convertDateMMMFormat(x.endDate)}</td>
          <td>{ convertDateMMMFormat(x.contract.endDate)}</td>
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

export default CoffsModalTable