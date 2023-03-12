import { Box } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { filterActions } from '../../store/actions';
import { AppHeader } from '../AppHeader';
import { FilterForm } from './FilterForm';
import { FilterResults } from './FilterResults';

export const FilterPage: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(filterActions.initPage());
  }, []);

  return (
    <>
      <AppHeader title="Meals"></AppHeader>

      <Box
        component="main"
        sx={{
          padding: 3,
          pb: 1,
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          boxSizing: 'border-box',
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
    </>
  );
};
