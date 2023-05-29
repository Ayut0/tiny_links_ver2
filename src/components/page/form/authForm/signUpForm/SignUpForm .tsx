import { Box, Stack, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { Controller } from 'react-hook-form';

import useSignUpForm from './hooks/useSignUpForm';

import Button from '@/components/ui/Button/Button';
import PageTitle from '@/components/ui/Title/Title';

const SignUpForm = () => {
  const { handleSubmit, signUpHandler, control, errors, error } = useSignUpForm();
  const signUpValidationRules = {
    userName: {
      register: 'Required field',
      minLength: { value: 5, message: 'User name requires at least 6 characters' },
    },
    email: {
      register: 'Required field',
      pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
    },
    password: {
      register: 'Required field',
      minLength: { value: 8, message: 'Password requires at least 8 characters' },
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
      <Typography>Please sign up here</Typography>
      <Stack
        spacing={3}
        component="form"
        noValidate
        onSubmit={handleSubmit(signUpHandler)}
        sx={{ width: '60%' }}
      >
        <Controller
          name="name"
          control={control}
          rules={signUpValidationRules.userName}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="User name"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={signUpValidationRules.email}
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={signUpValidationRules.password}
          render={({ field }) => (
            <TextField
              {...field}
              type="password"
              label="Password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button
          text="Sign up"
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
        <Typography>Already have an account?</Typography>
        <Link href="login">
          <Button text="Sign in" variant="contained" type="button" />
        </Link>
      </Box>
      {error && <Typography sx={{ color: '#ef4565' }}>{error}</Typography>}
    </Box>
  );
};

export default SignUpForm;
