import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import AddDesignation from '../pages/AddDesignation'
import DesignationList from '../pages/DesignationList'
import EmployeeList from '../pages/EmployeeList'
import AddEmployee from '../pages/AddEmployee'


const PrivetRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/addDesignation' element={<AddDesignation />} />
      <Route path='/designationList' element={<DesignationList />} />
      <Route path='/EmployeeList' element={<EmployeeList />} />
      <Route path='/addEmployee' element={<AddEmployee />} />
    </Routes>
  )
}

export default PrivetRoutes