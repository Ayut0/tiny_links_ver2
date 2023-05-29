import { Typography } from '@mui/material';
import React from 'react';

import type { Title } from './type';

const PageTitle = ({ content, variant, component, sx }: Title) => (
  <Typography variant={variant} component={component} sx={sx}>
    {content}
  </Typography>
);

export default PageTitle;
