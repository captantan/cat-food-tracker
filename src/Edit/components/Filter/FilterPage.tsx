import { Box, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CenterBox } from '../../../components/CenterBox';
import { filterActions } from '../../store/actions';
import { filterSelectors } from '../../store/selectors';
import { AppHeader } from '../AppHeader';

export const FilterPage: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(filterActions.initPage());
  }, []);

  const showResults = useSelector(filterSelectors.showResults);

  return (
    <>
      <AppHeader title="Meals"></AppHeader>

      <Box component="main" sx={{ padding: 3, pb: 1, flex: '1 0 auto' }}>
        <CenterBox>
          {showResults ? (
            <Typography>Results</Typography>
          ) : (
            <Typography>Form</Typography>
          )}
        </CenterBox>
      </Box>
    </>
  );
};
