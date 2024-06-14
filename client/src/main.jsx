import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { ModalDataProvider } from './context/ModalDataContext.jsx'
import { AdminProvider } from './context/AdminContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { SideBarProvider } from './context/SideBarContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider>
    <Provider store={store}> 
    <ModalDataProvider>
    <AdminProvider>
      <SideBarProvider>

    <App />
      </SideBarProvider>
    </AdminProvider>
    </ModalDataProvider>
    </Provider>
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
