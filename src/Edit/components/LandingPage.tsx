import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { SxProps } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CenterBox } from '../../components/CenterBox';
import { brandsSelectors } from '../store/selectors';
import { AppHeader } from './AppHeader';

const maxWidth = '360px';

const cardCSS: SxProps = {
  maxWidth,
  width: '100%',
  '&:not(:last-of-type)': {
    mb: 3,
  },
};

export const LandingPage: React.FC = () => {
  const hasFlavors = useSelector(brandsSelectors.hasAnyFlavors);

  return (
    <>
      <AppHeader title="File opened"></AppHeader>

      <CenterBox>
        <Typography variant="body1" textAlign="center" sx={{ maxWidth, mb: 3 }}>
          The file has been opened. What would you like to do first?
        </Typography>

        <Card sx={cardCSS}>
          <CardHeader
            title="Brands"
            titleTypographyProps={{
              variant: 'h6',
            }}
            sx={{ pb: 0 }}></CardHeader>
          <CardContent>
            <Typography>
              Enter brands and flavors. Add tags to find meals that served food
              with certain properties.
            </Typography>
          </CardContent>
          <CardActionArea sx={{ textAlign: 'center' }}>
            <Button color="primary" fullWidth component={Link} to="./brands">
              Go
            </Button>
          </CardActionArea>
        </Card>
        {hasFlavors && (
          <Card sx={cardCSS}>
            <CardHeader
              title="Meals"
              titleTypographyProps={{
                variant: 'h6',
              }}
              sx={{ pb: 0 }}></CardHeader>
            <CardContent>
              <Typography>
                Enter meals, add notes, and log the amount that was eaten.
              </Typography>
            </CardContent>
            <CardActionArea sx={{ textAlign: 'center' }}>
              <Button color="primary" fullWidth component={Link} to="./meals">
                Go
              </Button>
            </CardActionArea>
          </Card>
        )}
      </CenterBox>
    </>
  );
};
