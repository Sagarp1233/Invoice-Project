
import React from 'react';
import { useLocation } from 'react-router-dom';
import AuthLayout from '@/components/layouts/AuthLayout';
import Login from './Login';
import Register from './Register';

const Auth = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname === '/auth/register';

  return (
    <AuthLayout>
      {isRegisterPage ? <Register /> : <Login />}
    </AuthLayout>
  );
};

export default Auth;
