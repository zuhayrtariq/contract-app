
import { createContext, useState } from 'react';
export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [isDarkContext,setIsDarkContext] = useState(()=>{
    const theme = localStorage.getItem('theme')
    let isDark = false;
    if(theme == 'dark')
    isDark = true;
    else
    isDark = false
    return isDark;
  })
  const valueToShare = {
  isDarkContext,
  setIsDarkContext
  };
  return (
    <ThemeContext.Provider value={valueToShare}>{children}</ThemeContext.Provider>
  );
};