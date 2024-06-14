
import { createContext, useState } from 'react';
export const AdminContext = createContext();
export const AdminProvider = ({ children }) => {
  const [isAdmin,setIsAdmin] = useState(()=>{
    let isAdmin = localStorage.getItem('isAdmin');
    isAdmin = JSON.parse(isAdmin);
    return isAdmin || false;
  })
 
  const valueToShare = {
  isAdmin,
  setIsAdmin
  };
  return (
    <AdminContext.Provider value={valueToShare}>{children}</AdminContext.Provider>
  );
};