import React, { useContext } from 'react'
import SesModalTable from '../tables/SesModalTable'
import { ModalDataContext } from '../../context/ModalDataContext'

const SesDataModal = () => {
  const {modalName} = useContext(ModalDataContext)
  const sesModal = "sesDataModal"
  return (
    <div>

<dialog id={sesModal} className="modal">
  <div className="modal-box  w-11/12 max-w-5xl ">
    <h3 className="font-bold text-lg">Service Entries</h3>
    {sesModal == modalName && <SesModalTable/>}
   
  </div>
      <form method="dialog" className='modal-backdrop'>
        {/* if there is a button in form, it will close the modal */}
        <button>close</button>
      </form>
    
</dialog>

    </div>
  )
}

export default SesDataModal