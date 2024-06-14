
import { createContext, useState } from 'react';
export const SideBarContext = createContext();
export const SideBarProvider = ({ children }) => {
  const [sideBarIsOpen,setSideBarIsOpen] = useState(()=>{
    let sideBarIsOpen = localStorage.getItem('sideBarIsOpen');
    sideBarIsOpen = JSON.parse(sideBarIsOpen);
    return sideBarIsOpen || false;
  })
 
  const valueToShare = {
  sideBarIsOpen,
  setSideBarIsOpen
  };
  return (
    <SideBarContext.Provider value={valueToShare}>{children}</SideBarContext.Provider>
  );
};