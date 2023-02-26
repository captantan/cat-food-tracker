import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { ClassNames } from '@emotion/react';
import { useSelector } from 'react-redux';
import { brandsSelectors } from '../../store/selectors';
import { AppHeader } from '../AppHeader';

export const MealsPage: React.FC = () => {
  const hasAnyFlavors = useSelector(brandsSelectors.hasAnyFlavors);

  return (
    <>
      <AppHeader title="Meals"></AppHeader>

      <Box component="main" sx={{ padding: 3, flex: '1 0 auto' }}>
        <ClassNames>
          {({ css, cx }) => (
            <div className={cx('main-body', css`
          flex: 1 0 auto;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          
          padding: 16px;
        `)}>
              <Typography variant="h6" component="h1">Under Construction</Typography>
              <Typography variant="body1" component="p">This page is under construction, please come back later to check it out.</Typography>
            </div>
          )}
        </ClassNames>
      </Box>
    </>
  );
}