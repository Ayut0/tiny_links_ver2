import { Stack, TextField } from '@mui/material';

import { Controller } from 'react-hook-form';

import useUrlRegisterForm from './hooks/useUrlRegisterForm';

import Button from '@/components/ui/Button/Button';
import PageTitle from '@/components/ui/Title/Title';

const UrlRegisterForm = () => {
  const { handleSubmit, submitHandler, control } = useUrlRegisterForm();

  const validationRules = {
    longUrl: {
      register: 'Required field',
      minLength: { value: 5, message: 'Min length is 5' },
    },
  };

  return (
    <>
      <PageTitle content="Generate shorten URL" variant={'h4'} component={'symbol'} />
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
    </>
  );
};

export default UrlRegisterForm;
