import React, { useContext } from 'react'
import ContractsModalTable from '../tables/ContractsModalTable'
import { ModalDataContext } from '../../context/ModalDataContext'

const ContractsDataModal = () => {

  const {modalName} = useContext(ModalDataContext)

  const contractsModal = "contractsDataModal";
  return (
    <div>

<dialog id={contractsModal} className="modal">
  <div className="modal-box  w-11/12 max-w-5xl ">
    <h3 className="font-bold text-lg">Contracts</h3>
    {modalName == contractsModal && <ContractsModalTable/>}
   
  </div>
      <form method="dialog" className='modal-backdrop'>
        {/* if there is a button in form, it will close the modal */}
        <button>close</button>
      </form>
    
</dialog>

    </div>
  )
}

export default ContractsDataModal