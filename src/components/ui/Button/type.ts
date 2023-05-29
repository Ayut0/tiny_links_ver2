import { SxProps, Theme } from '@mui/material';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

type ButtonProps = {
  children?: ReactNode | React.ReactNode[];
  text: string;
  onClick?: () =>
    | void
    | Dispatch<SetStateAction<boolean>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | ((e: any) => Promise<void>)
    | React.MouseEvent<HTMLButtonElement, MouseEvent>
    | (() => Promise<void>)
    | Promise<void>;
  sx?: SxProps<Theme> | undefined;
  variant: 'text' | 'outlined' | 'contained' | undefined;
  type: 'submit' | undefined | 'button';
  icon?: React.ReactNode;
};

export default ButtonProps;
