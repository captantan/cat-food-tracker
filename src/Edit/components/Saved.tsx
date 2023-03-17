import { Icon, Typography, Button } from '@mui/material';
import React from 'react';
import { CenterBox } from '../../components/CenterBox';

export const Saved: React.FC<{ action: () => void }> = ({ action }) => {
  return (
    <CenterBox>
      <Icon
        color="primary"
        fontSize="inherit"
        sx={{ mb: 0, fontWeight: 100, fontSize: 180 }}>
        check_circle
      </Icon>
      <Typography variant="body1" sx={{ mb: 3 }} color="primary">
        Successfully saved
      </Typography>
      <Button color="primary" variant="outlined" onClick={action}>
        Return to content
      </Button>
    </CenterBox>
  );
};
