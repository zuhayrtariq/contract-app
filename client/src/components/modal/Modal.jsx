import React, { useContext } from 'react'
import { ModalDataContext } from '../../context/ModalDataContext'
import ContractPageModal from './ContractPageModal'
import RequisitionPageModal from './RequisitionPageModal'
import RequisitionEditModal from './RequistionEditModal'
import ContractEditModal from './ContractEditModal'
import { Toaster } from 'react-hot-toast'
import CoffPageModal from './CoffPageModal'
import CoffEditModal from './CoffEditModal'

const Modal = () => {
  
  const {modalName,modalData,setModalData,setModalName} = useContext(ModalDataContext);
  const handleModalClose = () =>{
    setModalName('')
    setModalData([]);
  }

  return (
    <div>
<dialog id="basicModal" className="modal">
    <div className="modal-box max-w-5xl md:min-w-[800px] w-11/12">

{modalName == 'contractPageModal' &&  <ContractPageModal/> }
{modalName == 'requisitionPageModal' &&  <RequisitionPageModal/> }
{modalName == 'coffPageModal' &&  <CoffPageModal/> }
{modalName == 'requisitionEditModal' && <RequisitionEditModal/>}
{modalName == 'contractEditModal' && <ContractEditModal/>}
{modalName == 'coffEditModal' && <CoffEditModal/>}
<form method="dialog" onSubmit={handleModalClose} >
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl w-[40px] h-[40px]"  >✕</button>
    </form>
    <Toaster/>
    </div>
  


   

 
</dialog>
    </div>
  )
}

export default Modal