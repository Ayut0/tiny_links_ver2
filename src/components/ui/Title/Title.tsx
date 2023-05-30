import { Typography } from '@mui/material';
import React from 'react';

import type { Title } from './type';

const PageTitle = ({ content, variant, sx }: Title) => (
  <Typography variant={variant} sx={sx}>
    {content}
  </Typography>
);

export default PageTitle;
