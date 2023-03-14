import { Box } from '@mui/material';
import React from 'react';

export const CenterColumn: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <Box
    component="main"
    sx={{
      padding: 3,
      pb: 2,
      flex: '1 0 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}>
    <Box
      sx={{
        flex: '1 0 auto',
        maxWidth: '960px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
      {children}
    </Box>
  </Box>
);
