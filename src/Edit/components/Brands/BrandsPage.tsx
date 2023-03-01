import { Dialog , Box} from '@mui/material';
import React from 'react';
import { BrandList } from './BrandList';
import { useDispatch, useSelector } from 'react-redux';
import { brandsSelectors, uiSelectors } from '../../store/selectors';
import { AddEditBrand } from './AddEditBrand';
import { brandsActions } from '../../store/actions';
import { AddEditFlavor } from './AddEditFlavor';
import { AppHeader } from '../AppHeader';

export const BrandsPage: React.FC = () => {
  const dispatch = useDispatch();
  
  const editBrandOpen = useSelector(brandsSelectors.isEditBrandOpen);
  const editFlavorOpen = useSelector(brandsSelectors.isEditFlavorOpen);
  
  return (<>
    <AppHeader title="Brands"></AppHeader>
    
    <Box component="main" sx={{padding: 3, flex: '1 0 auto'}}>
      <BrandList></BrandList>
    </Box>
    
    <Dialog open={editBrandOpen} onClose={() => dispatch(brandsActions.cancelEditBrand())}>
      <AddEditBrand></AddEditBrand>
    </Dialog>
    <Dialog open={editFlavorOpen} onClose={() => dispatch(brandsActions.cacncelEditFlavor())}>
      <AddEditFlavor></AddEditFlavor>
    </Dialog>
    </>
  );
}