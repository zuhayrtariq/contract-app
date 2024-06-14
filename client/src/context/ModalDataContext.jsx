
import { createContext, useEffect, useState } from 'react';
export const ModalDataContext = createContext();
export const ModalDataProvider = ({ children }) => {
  const [modalData, setModalData] = useState([]);
  const [modalName,setModalName] = useState('')

 
  const valueToShare = {
    modalData,
    setModalData,
    modalName,setModalName
  };
  return (
    <ModalDataContext.Provider value={valueToShare}>{children}</ModalDataContext.Provider>
  );
};