import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'


const ProtectedRoute = ({requiredRole}) => {
  return <Outlet/>
}

export default ProtectedRoute