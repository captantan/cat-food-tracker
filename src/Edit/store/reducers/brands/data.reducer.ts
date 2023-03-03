import { createReducer } from "@reduxjs/toolkit";
import { brandsActions, fileActions } from "../../actions";
import { BrandListState } from "../../state";

export const brandDataReducer = createReducer<BrandListState>(
  {},
  (builder) => builder
    .addCase(
      brandsActions.saveBrand,
      (state, action) => {
        const flavors = state[action.payload.id]?.flavors ?? {};


        return {...state, [action.payload.id]: {
          id: action.payload.id,
          name: action.payload.name,
          flavors,
        }};
      }
    )
    .addCase(
      brandsActions.saveFlavor,
      (state, action) => {
        const selectedBrand = state[action.payload.brand];
        if (!selectedBrand) {
          throw new Error('Brand missing!');
        }

        return {...state, [selectedBrand.id]: {
          ...selectedBrand,
          flavors: {
            ...selectedBrand.flavors,
            [action.payload.id]: {
              id: action.payload.id,
              name: action.payload.name,
              tags: action.payload.tags,
            }
          }
        }};
      }
    )
    .addCase(
      fileActions.loadFileSucceeded,
      (_state, action) => action.payload.brands
    )
);
