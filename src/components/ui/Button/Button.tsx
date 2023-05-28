import { Button as MUIButton } from '@mui/material';
import React from 'react';

import type ButtonProps from './type';

function Button({ text, onClick, sx, variant, type }: ButtonProps) {
  return (
    <MUIButton sx={sx} onClick={onClick} variant={variant} type={type}>
      {text}
    </MUIButton>
  );
}

export default Button;
