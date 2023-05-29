import React from 'react';

import Button from '../Button/Button';

import useSignOut from './hooks/useSignOut';

const SignOutButton = () => {
  const { handleSignOut } = useSignOut();

  return (
    <Button
      onClick={() => handleSignOut()}
      text="Sign out"
      variant="contained"
      type="button"
    />
  );
};

export default SignOutButton;
