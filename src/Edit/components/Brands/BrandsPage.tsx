import { Dialog, Box, Fab, Icon } from '@mui/material';
import React from 'react';
import { BrandList } from './BrandList';
import { useDispatch, useSelector } from 'react-redux';
import { brandsSelectors } from '../../store/selectors';
import { AddEditBrand } from './AddEditBrand';
import { brandsActions } from '../../store/actions';
import { AddEditFlavor } from './AddEditFlavor';
import { AppHeader } from '../AppHeader';

export const BrandsPage: React.FC = () => {
  const dispatch = useDispatch();

  const editBrandOpen = useSelector(brandsSelectors.isEditBrandOpen);
  const editFlavorOpen = useSelector(brandsSelectors.isEditFlavorOpen);

  return (
    <>
      <AppHeader title="Brands"></AppHeader>

      <Box component="main" sx={{ padding: 3, pb: 1, flex: '1 0 auto' }}>
        <BrandList></BrandList>
      </Box>
      <Box
        sx={(theme) => ({
          maxWidth: 960,
          width: '100%',
          m: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          position: 'sticky',
          bottom: theme.spacing(2),
          mb: 2,
          mt: 1,
          pr: 2,
          boxSizing: 'border-box',
        })}>
        <Fab
          color="secondary"
          onClick={() => dispatch(brandsActions.newBrand())}>
          <Icon>add</Icon>
        </Fab>
      </Box>

      <Dialog
        open={editBrandOpen}
        onClose={() => dispatch(brandsActions.cancelEditBrand())}>
        <AddEditBrand></AddEditBrand>
      </Dialog>
      <Dialog
        open={editFlavorOpen}
        onClose={() => dispatch(brandsActions.cacncelEditFlavor())}>
        <AddEditFlavor></AddEditFlavor>
      </Dialog>
    </>
  );
};
