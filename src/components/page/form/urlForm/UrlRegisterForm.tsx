import { Stack, TextField } from '@mui/material';

import { Controller } from 'react-hook-form';

import useUrlRegister from './hooks/useUrlRegister';

import Button from '@/components/ui/Button/Button';

const UrlRegisterForm = () => {
  const { handleSubmit, submitHandler, control } = useUrlRegister();

  const validationRules = {
    longUrl: {
      register: 'Required field',
      minLength: { value: 5, message: 'Min length is 5' },
    },
  };

  return (
    <Stack component="form" noValidate onSubmit={handleSubmit(submitHandler)}>
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
          />
        )}
      />
      <Button text="Generate" variant="contained" type="submit" />
    </Stack>
  );
};

export default UrlRegisterForm;
