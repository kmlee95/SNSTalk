import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import SignInForm from '../container/SignInForm';

const SignIn = () => {
  const id = useSelector((state) => state.user.me?.id);

  useEffect(() => {
    if (id) {
      Router.push('/');
    }
  }, [id]);

  return <SignInForm />;
};

export default SignIn;
