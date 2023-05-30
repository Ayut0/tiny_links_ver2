import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Link from 'next/link';

import React from 'react';

import useHeader from './hooks/useHeader';

import Button from '@/components/ui/Button/Button';
import SignOutButton from '@/components/ui/SignOut/SignOutButton';
import PageTitle from '@/components/ui/Title/Title';

function Header() {
  const { state } = useHeader();

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Link href="/">
              <PageTitle
                variant="h2"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1.25rem', md: '2rem' },
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
                content={'Tiny Links'}
              />{' '}
            </Link>
            {state.userStatus !== 'error' &&
              typeof state.signedInUser !== 'undefined' && (
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-around', width: '30%' }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: '.75rem', md: '1rem' },
                      color: 'inherit',
                      textDecoration: 'none',
                      display: { xs: 'none', md: 'block' },
                    }}
                  >
                    Welcome Back, {state.signedInUser.name}
                  </Typography>
                  <Link href="/mypage">
                    <Typography
                      sx={{
                        fontSize: { xs: '.75rem', md: '1rem' },
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                    >
                      My page
                    </Typography>
                  </Link>
                </Box>
              )}
            {state.userStatus === 'success' &&
            typeof state.signedInUser === 'undefined' ? (
              <Link href="/signup">
                <Button text="Sign up" variant="contained" type="button" />
              </Link>
            ) : (
              <SignOutButton />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
