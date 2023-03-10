import { createReducer } from '@reduxjs/toolkit';
import { brandsActions } from '../../actions';
import { BrandEditState } from '../../state';

export const brandEditReducer = createReducer<BrandEditState>(
  { brandId: null, flavorId: null, brandOpen: false, flavorOpen: false },
  (builder) =>
    builder
      .addCase(brandsActions.editBrand, (state, action) => ({
        ...state,
        brandId: action.payload,
        brandOpen: true,
      }))
      .addCase(brandsActions.newBrand, (state, _action) => ({
        ...state,
        brandId: null,
        brandOpen: true,
      }))
      .addCase(brandsActions.saveBrand, (state, _action) => ({
        ...state,
        brandOpen: false,
      }))
      .addCase(brandsActions.cancelEditBrand, (state, _action) => ({
        ...state,
        brandOpen: false,
      }))
      .addCase(brandsActions.editFlavor, (state, action) => ({
        ...state,
        brandId: action.payload.brand,
        flavorId: action.payload.flavor,
        flavorOpen: true,
      }))
      .addCase(brandsActions.newFlavor, (state, action) => ({
        ...state,
        brandId: action.payload.brand,
        flavorId: null,
        flavorOpen: true,
      }))
      .addCase(brandsActions.saveFlavor, (state, _action) => ({
        ...state,
        flavorOpen: false,
      }))
      .addCase(brandsActions.cacncelEditFlavor, (state, _action) => ({
        ...state,
        flavorOpen: false,
      })),
);
