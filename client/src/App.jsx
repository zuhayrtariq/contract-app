import React, { useContext } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import DashboardPage from './pages/DashboardPage'
import ContractTable from './components/tables/ContractTable'
import CoffTable from './components/tables/CoffTable'
import RequisitionTable from './components/tables/RequisitionTable'
import GridLayout from './layout/GridLayout'

import BackDropModal from './components/modal/BackDropModal'
import Modal from './components/modal/Modal'
import LoginModal from './components/modal/LoginModal'





const App = () => {
  return (
    <div>

       <Routes>
        <Route path='/' element={<DefaultLayout/>} >
        <Route path='/' element={<DashboardPage/>}  />
       
        </Route>
        <Route path='/' element={<GridLayout/>} >
        <Route path='/contracts' element={<ContractTable/>}  />
        <Route path='/call-offs' element={<CoffTable/>}  />
        <Route path='/requisitions' element={<RequisitionTable/>}  />
        </Route>
       </Routes>

<BackDropModal/>
    <Modal/>
    <LoginModal/>
    </div>
  )
}

export default App