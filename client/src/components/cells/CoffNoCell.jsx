import React, { useContext } from 'react'
import { ModalDataContext } from '../../context/ModalDataContext';
import { AdminContext } from '../../context/AdminContext';
import { useLazyGetCoffQuery } from '../../store/apis/coffApi';

const CoffNoCell = ({value,data}) => {
  const {coffNo} = data;
  const {modalData,setModalData,setModalName} = useContext(ModalDataContext);
  const {isAdmin} = useContext(AdminContext);
  
  const [getCallOff,{data : data2,isLoading, error}] = useLazyGetCoffQuery(value);
  const handleClick = async() =>{
    const CallOffData = await getCallOff(coffNo).unwrap();
    setModalData(CallOffData);
    if(isAdmin)
    setModalName('coffEditModal')
  else
    setModalName('coffPageModal');
    
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

export default CoffNoCell