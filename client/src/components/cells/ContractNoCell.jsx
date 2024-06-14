import React, { useContext } from 'react'
import { ModalDataContext } from '../../context/ModalDataContext';

import { AdminContext } from '../../context/AdminContext';
import { useLazyGetContractWithCoffQuery } from '../../store/apis/contractsApi';

const ContractNoCell = ({value,data}) => {
  const {contractNo} = data;

  const {modalData,setModalData,setModalName} = useContext(ModalDataContext);
  
  const {isAdmin} = useContext(AdminContext);
  const [getContract,{data : data2,isLoading, error}] = useLazyGetContractWithCoffQuery(value);
  const handleClick = async() =>{
    const contractData = await getContract(contractNo).unwrap();

    setModalData(contractData);
    if(isAdmin)
    setModalName('contractEditModal')
  else
    setModalName('contractPageModal');
    
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

export default ContractNoCell