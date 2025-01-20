import React from 'react'
import PrivetRoutes from './PrivetRoutes'
import PublicRoutes from './PublicRoutes'
import { useSelector } from 'react-redux'

const Router = () => {
  const { isLoggedIn } = useSelector((state:any) => state.auth)


  return (
    <>
      {isLoggedIn ? <PrivetRoutes /> : <PublicRoutes />}
    </>
  )
}

export default Router