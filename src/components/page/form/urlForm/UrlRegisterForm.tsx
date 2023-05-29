import { Stack, TextField, Typography } from '@mui/material';

import { Controller } from 'react-hook-form';

import useUrlRegisterForm from './hooks/useUrlRegisterForm';

import Button from '@/components/ui/Button/Button';
import PageTitle from '@/components/ui/Title/Title';

const UrlRegisterForm = () => {
  const { handleSubmit, submitHandler, control, error } = useUrlRegisterForm();

  const validationRules = {
    longUrl: {
      register: 'Required field',
      minLength: { value: 5, message: 'Min length is 5' },
    },
  };

  return (
    <>
      <PageTitle
        content="Please enter ling URL here"
        variant={'h4'}
        component={'symbol'}
      />
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit(submitHandler)}
        sx={{ width: '60%' }}
      >
        <Controller
          name="longUrl"
          control={control}
          rules={validationRules.longUrl}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="text"
              label="URL"
              error={!!fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : null}
              sx={{ marginBottom: '1rem' }}
            />
          )}
        />
        <Button text="Generate" variant="contained" type="submit" />
      </Stack>
      {error && <Typography sx={{ color: '#ef4565' }}>{error}</Typography>}
      <Typography>
        * Please enter the URL you want to shorten in the URL field and click the Generate
        button.
      </Typography>
    </>
  );
};

export default UrlRegisterForm;
