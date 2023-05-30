import { Typography } from '@mui/material';
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
    return <Typography sx={{ color: '#5f6c7b' }}>Loading...</Typography>;
  }

  return (
    <>
      <PageTitle
        content="Generate your own shortened URL"
        variant={'h2'}
        sx={{
          color: '#094067',
          fontWeight: '700',
          fontSize: { xs: '1.5rem', md: '2rem' },
        }}
      />
      <UrlRegisterForm />
    </>
  );
};

export default Top;
