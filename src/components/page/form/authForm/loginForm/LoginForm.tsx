import { Box, Stack, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { Controller } from 'react-hook-form';

import useLoginForm from './hooks/useLoginForm';

import Button from '@/components/ui/Button/Button';
import PageTitle from '@/components/ui/Title/Title';

const LoginForm = () => {
  const { handleSubmit, loginHandler, control, errors } = useLoginForm();
  const loginValidationRules = {
    email: {
      register: 'Required field',
      minLength: { value: 5, message: 'Min length is 5' },
    },
    password: {
      register: 'Required field',
      minLength: { value: 8, message: 'Min length is 8' },
    },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3rem',
      }}
    >
      <PageTitle
        content="Welcome to Tiny Links"
        variant={'h2'}
        component={'symbol'}
        sx={{ color: '#094067', fontWeight: '700', marginTop: '2rem' }}
      />
      <Typography>Please log in </Typography>
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit(loginHandler)}
        sx={{ width: '60%' }}
      >
        <Controller
          name="email"
          control={control}
          rules={loginValidationRules.email}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ marginBottom: '1rem' }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={loginValidationRules.password}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ marginBottom: '1rem' }}
            />
          )}
        />
        <Button
          text="Login"
          variant="contained"
          type="submit"
          sx={{ fontSize: '1.5rem' }}
        />
      </Stack>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Typography>Don&#39;t have an account?</Typography>
        <Link href="signup">
          <Button text="Sign up" variant="contained" type="button" />
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
