import React, { useContext } from 'react'
import ContractsModalTable from '../tables/ContractsModalTable'
import RequisitionsModalTable from '../tables/RequisitionsModalTable'
import { ModalDataContext } from '../../context/ModalDataContext'

const RequisitionsDataModal = () => {
  const {modalName} = useContext(ModalDataContext)
  return (
    <div>

<dialog id="requisitionsDataModal" className="modal">
  <div className="modal-box  w-11/12 max-w-5xl ">
    <h3 className="font-bold text-lg">Requisitions</h3>
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

export default RequisitionsDataModal