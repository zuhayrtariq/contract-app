import React, { useContext } from 'react'
import CoffsModalTable from '../tables/CoffsModalTable';
import SesModalTable from '../tables/SesModalTable';
import ContractsModalTable from '../tables/ContractsModalTable';
import RequisitionsModalTable from '../tables/RequisitionsModalTable';
import { ModalDataContext } from '../../context/ModalDataContext';

const BackDropModal = () => {
    const {modalName} = useContext(ModalDataContext);
    let heading = '';
    if(modalName == 'contractsDataModal')
        heading = 'Contracts'
    else if(modalName == 'requisitionsDataModal')
        heading = 'Requisitions'
    else if(modalName == 'coffsDataModal')
        heading = 'Call-Offs'
    else if(modalName == 'sesDataModal')
        heading = 'Call-Offs'
    return (
      <div>
  
  <dialog id="backDropModal" className="modal">
    <div className="modal-box  w-11/12 max-w-5xl ">
      <h3 className="font-bold text-lg">{heading}</h3>
      {modalName == 'contractsDataModal' && <ContractsModalTable/>}
      {modalName == 'coffsDataModal' && <CoffsModalTable/>}
      {modalName == 'sesDataModal' && < SesModalTable/>}
      {modalName == 'requisitionsDataModal' && <RequisitionsModalTable/>}
    </div>
        <form method="dialog" className='modal-backdrop'>
          {/* if there is a button in form, it will close the modal */}
          <button>close</button>
        </form>
      
  </dialog>
  
      </div>
    )
}

export default BackDropModal