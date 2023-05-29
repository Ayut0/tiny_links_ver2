import { Stack, TextField } from '@mui/material';
import React from 'react';

import { Controller } from 'react-hook-form';

import useSignUpForm from './hooks/useSignUpForm';

import Button from '@/components/ui/Button/Button';

const SignUpForm = () => {
  const { handleSubmit, signUpHandler, control, errors } = useSignUpForm();
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
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(signUpHandler)}
      sx={{ width: '60%' }}
    >
      <Controller
        name="userName"
        control={control}
        rules={signUpValidationRules.userName}
        render={({ field }) => (
          <TextField
            {...field}
            type="text"
            label="User name"
            error={!!errors.userName}
            helperText={errors.userName?.message}
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
      <Button text="Sign up" variant="contained" type="submit" />
    </Stack>
  );
};

export default SignUpForm;
