import React from 'react';

import UrlRegisterForm from '../form/urlForm/UrlRegisterForm';

import useUserStatus from './hooks/useUser';

import PageTitle from '@/components/ui/Title/Title';

const Top = () => {
  const { userStatus, signedInUser, redirectToLogin } = useUserStatus();
  if (typeof signedInUser === 'undefined') {
    redirectToLogin();
  }
  if (userStatus === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PageTitle
        content="Tiny Links"
        variant={'h2'}
        component={'symbol'}
        sx={{ color: '#094067', fontWeight: '700' }}
      />
      <UrlRegisterForm />
    </>
  );
};

export default Top;
