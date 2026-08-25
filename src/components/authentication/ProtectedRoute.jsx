import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = (children) => {
  const {user, isLoading} = useAuth();
  const location = useLocation();

  if (isLoading){
    return <div>Loading...</div>
  }

  if (!user) {
    return (
        <Navigate 
        to="/login"
        state={{ from: location }}
        replace
        />
    )
  }

  return children;
}

export default ProtectedRoute