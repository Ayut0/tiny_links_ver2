/* eslint-disable @typescript-eslint/no-explicit-any */
import { SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

export type Title = {
  content: string | ReactNode;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'subtitle1';
  sx?: SxProps<Theme> | undefined;
};
