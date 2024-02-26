import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isAuthenticated) {
        navigate('/main');
      }
    }, [isAuthenticated, navigate]);
  
    return children;
};

export default PublicRoute;
  