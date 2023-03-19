import { Dialog } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { brandsSelectors } from '../../store/selectors';
import { AddEditBrand } from './AddEditBrand';
import { brandsActions } from '../../store/actions';
import { AddEditFlavor } from './AddEditFlavor';
import { Outlet } from 'react-router';

export const BrandsPage: React.FC = () => {
  const dispatch = useDispatch();

  const editBrandOpen = useSelector(brandsSelectors.isEditBrandOpen);
  const editFlavorOpen = useSelector(brandsSelectors.isEditFlavorOpen);

  return (
    <>
      <Outlet />

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
