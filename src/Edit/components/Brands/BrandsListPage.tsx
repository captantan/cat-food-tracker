import { Dialog, Box, Fab, Icon } from '@mui/material';
import React from 'react';
import { BrandList } from './BrandList';
import { useDispatch, useSelector } from 'react-redux';
import { brandsSelectors } from '../../store/selectors';
import { AddEditBrand } from './AddEditBrand';
import { brandsActions } from '../../store/actions';
import { AddEditFlavor } from './AddEditFlavor';
import { AppHeader } from '../AppHeader';
import { CenterColumn } from '../../../components/CenterColumn';

export const BrandsListPage: React.FC = () => {
  const dispatch = useDispatch();

  const editBrandOpen = useSelector(brandsSelectors.isEditBrandOpen);
  const editFlavorOpen = useSelector(brandsSelectors.isEditFlavorOpen);

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
