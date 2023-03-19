import { Box, Fab, Icon } from '@mui/material';
import React from 'react';
import { BrandList } from './BrandList';
import { useDispatch } from 'react-redux';
import { brandsActions } from '../../store/actions';
import { AppHeader } from '../AppHeader';
import { CenterColumn } from '../../../components/CenterColumn';

export const BrandListPage: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <>
      <AppHeader title="Brands"></AppHeader>

      <CenterColumn>
        <Box sx={{ flex: '1 0 auto', mb: 1 }}>
          <BrandList basePath="./"></BrandList>
        </Box>
        <Fab
          sx={(theme) => ({
            alignSelf: 'flex-end',
            position: 'sticky',
            bottom: theme.spacing(2),
            right: 0,
            mr: 2,
          })}
          color="secondary"
          onClick={() => dispatch(brandsActions.newBrand())}>
          <Icon>add</Icon>
        </Fab>
      </CenterColumn>
    </>
  );
};
