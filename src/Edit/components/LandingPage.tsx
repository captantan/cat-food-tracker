import { Button, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CenterBox } from '../../components/CenterBox';
import { brandsSelectors } from '../store/selectors';
import { AppHeader } from './AppHeader';

export const LandingPage: React.FC = () => {
  const hasFlavors = useSelector(brandsSelectors.hasAnyFlavors);

  return (
    <>
      <AppHeader title="File opened"></AppHeader>

      <CenterBox>
        <Typography variant="body1">
          The file has been opened. What would you like to do first?
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
