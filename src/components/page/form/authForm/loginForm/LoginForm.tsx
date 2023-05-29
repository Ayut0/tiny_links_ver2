import { Stack, TextField } from '@mui/material';
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
    <>
      <PageTitle
        content="Tiny Links"
        variant={'h2'}
        component={'symbol'}
        sx={{ color: '#094067', fontWeight: '700' }}
      />
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
        <Button text="Login" variant="contained" type="submit" />
      </Stack>
    </>
  );
};

export default LoginForm;
