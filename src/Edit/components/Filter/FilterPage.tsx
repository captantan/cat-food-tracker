import { Box, Theme, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { MobileTabs } from '../../../components/MobileTabs';
import { filterActions } from '../../store/actions';
import { AppHeader } from '../AppHeader';
import { FilterForm } from './FilterForm';
import { FilterResults } from './FilterResults';

export const FilterPage: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(filterActions.initPage());
  }, []);

  const isMdPlus = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <>
      <AppHeader title="Meals"></AppHeader>

      {isMdPlus ? (
        <Box
          component="main"
          sx={{
            padding: 3,
            display: 'flex',
            flexDirection: 'row',
            boxSizing: 'border-box',
            flex: '1 0 auto',
            width: '100%',
          }}>
          <Box
            sx={{
              flex: '1 1 33%',
              borderColor: 'divider',
              borderRight: 1,
              pr: 3,
            }}>
            <FilterForm />
          </Box>

          <Box sx={{ flex: '1 1 67%', pl: 3 }}>
            <FilterResults />
          </Box>
        </Box>
      ) : (
        <Box component="main" sx={{ width: '100%', flex: '1 0 auto' }}>
          <MobileTabs>
            {[
              { key: 'filters', title: 'Filters', content: <FilterForm /> },
              { key: 'results', title: 'Results', content: <FilterResults /> },
            ]}
          </MobileTabs>
        </Box>
      )}
    </>
  );
};
