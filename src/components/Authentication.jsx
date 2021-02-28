import React, { useContext } from 'react';

import CurrentUser from './CurrentUser';
import SignInAndSignUp from './SignInAndSignUp';

import { UserContext } from '../providers/UserProvider';

const Authentication = () => {
  const { user, loading } = useContext(UserContext);
  if (loading) {
    console.log('loading');
    return null;
  }
  console.log('show', { user });

  return <div>{user ? <CurrentUser {...user} /> : <SignInAndSignUp />}</div>;
};

export default Authentication;
