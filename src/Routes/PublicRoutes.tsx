import React from 'react'
import { Route, Routes } from 'react-router-dom'


import Login from '../pages/Login'
import Register from '../pages/Register'

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default PublicRoutes