import { Button, Typography, Icon } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CenterBox } from '../../components/CenterBox';
import { brandsSelectors } from '../store/selectors';
import { AppHeader } from './AppHeader';

export const NotFound: React.FC = () => {
  const hasFlavors = useSelector(brandsSelectors.hasAnyFlavors);

  return (
    <>
      <AppHeader title="Missing Page"></AppHeader>

      <CenterBox>
        <Icon color="primary" sx={{ mb: 1, fontSize: 180, fontWeight: 100 }}>
          unknown_document
        </Icon>
        <Typography variant="h6" component="h2" gutterBottom={false}>
          You might be lost?
        </Typography>

        <Typography
          variant="caption"
          sx={{ mb: 2, maxWidth: '480px', textAlign: 'center' }}>
          We found the file you were looking for, but the rest of the path is a
          mystery to us. Why don&apos;t you visit one of these pages to continue
          your journey?
        </Typography>
        <Button color="primary" component={Link} to="./brands">
          Edit Brands
        </Button>
        {hasFlavors && (
          <Button color="secondary" component={Link} to="./meals">
            Enter Meals
          </Button>
        )}
      </CenterBox>
    </>
  );
};
