import React, { useContext } from 'react'
import CoffsModalTable from '../tables/CoffsModalTable'
import { ModalDataContext } from '../../context/ModalDataContext'

const CoffsDataModal = () => {
  const {modalName} = useContext(ModalDataContext);
  return (
    <div>

<dialog id="coffsDataModal" className="modal">
  <div className="modal-box  w-11/12 max-w-5xl ">
    <h3 className="font-bold text-lg">Call-Offs</h3>
    {modalName == 'coffsDataModal' && <CoffsModalTable/>}
   
  </div>
      <form method="dialog" className='modal-backdrop'>
        {/* if there is a button in form, it will close the modal */}
        <button>close</button>
      </form>
    
</dialog>

    </div>
  )
}

export default CoffsDataModal