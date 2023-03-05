import { createAction } from "@reduxjs/toolkit";
import { editActionPrefix } from "../../feature.const";

const actionPrefix = editActionPrefix + '[Brands] ';

export const editBrand = createAction<string /* guid */>(actionPrefix + 'Edit');
export const newBrand = createAction(actionPrefix + 'New');
export const saveBrand = createAction<{id: string, name: string}>(actionPrefix + 'Save');
export const cancelEditBrand = createAction(actionPrefix + 'Cancel');

export const editFlavor = createAction<{brand: string /* guid */, flavor: string /* guid */}>(actionPrefix + 'Edit Flavor');
export const newFlavor = createAction<{brand: string /* guid */}>(actionPrefix + 'Add Flavor');
export const saveFlavor = createAction<{id: string, brand: string, name: string, tags: string[]}>(actionPrefix + 'Save Flavor');
export const cacncelEditFlavor = createAction(actionPrefix + 'Cancel Edit Flavor')