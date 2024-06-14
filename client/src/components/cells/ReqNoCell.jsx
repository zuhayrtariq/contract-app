import React, { useContext } from 'react'
import { ModalDataContext } from '../../context/ModalDataContext'
import RequisitionEditModal from '../modal/RequistionEditModal';
import { AdminContext } from '../../context/AdminContext';
import { useLazyGetRequisitionQuery } from '../../store/apis/requisitionApi';

const ReqNoCell = ({value,data}) => {
  if(!value)
    {
      return <div className=''>---</div>
    }
  const {reqNo} = data;
  const {modalData,setModalData,setModalName} = useContext(ModalDataContext);
  const {isAdmin} = useContext(AdminContext)
  
  const [getRequisition,{data : data2,isLoading, error}] = useLazyGetRequisitionQuery(value);
  const handleClick = async() =>{

    const requisitionData = await getRequisition(reqNo).unwrap();

    setModalData(requisitionData);
    if(isAdmin)
      setModalName('requisitionEditModal');
    else
    setModalName('requisitionPageModal');
    
    document.getElementById('basicModal').showModal();


  }
  return (
    <div className=''>
      <span className='font-bold cursor-pointer hover:underline' onClick={handleClick}>

      {value}
      </span>

    </div>
  )
}

export default ReqNoCell