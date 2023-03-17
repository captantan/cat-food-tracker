import { Icon, Typography, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { CenterBox } from '../../components/CenterBox';

export const NotFound: React.FC<{ backPath: string }> = ({ backPath }) => {
  return (
    <CenterBox>
      <Icon color="primary" sx={{ mb: 1, fontSize: 180, fontWeight: 100 }}>
        unknown_document
      </Icon>
      <Typography variant="h6" component="h2" gutterBottom={false}>
        We can&apos;t find that folder...
      </Typography>
      <Typography
        variant="caption"
        component="p"
        textAlign="center"
        sx={{ maxWidth: '360px', mb: 3 }}>
        It looks like that folder doesn&apos;t exist or cannot be accessed.
        Let&apos;s go back up one level.
      </Typography>

      <Button component={Link} to={backPath} variant="outlined" color="primary">
        Go up a level
      </Button>
    </CenterBox>
  );
};
