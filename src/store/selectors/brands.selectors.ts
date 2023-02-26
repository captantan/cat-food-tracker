import { createSelector } from "reselect";
import { State } from "../state";
import { ascend, sort } from 'ramda';

const brandFeatureSelector = (state: State) => state.brands;

const brandDictionary = createSelector(brandFeatureSelector, (f) => f.data);

export const brandListVM = createSelector(brandDictionary, (b) => {
  const brands = Object.values(b);
  const sorted = sort(ascend((b) => b.name), brands);

  return sorted.map((b) => {
    const flavors = sort(ascend((f) => f.name), Object.values(b.flavors));

    return {id: b.id, name: b.name, flavors};
  });
});

const editState = createSelector(brandFeatureSelector, (f) => f.edit);

export const editBrandId = createSelector(editState, (e) => e.brandId);
export const isEditBrandOpen = createSelector(editState, (e) => e.brandOpen);
export const currentBrandName = createSelector(editBrandId, brandDictionary, (id, b) => {
  if (!id) {
    return null;
  }

  return b[id]?.name ?? null;
});

export const editFlavorId = createSelector(editState, (e) => e.flavorId);
export const isEditFlavorOpen = createSelector(editState, (e) => e.flavorOpen);
const currentFlavor = createSelector(editFlavorId, editBrandId, brandDictionary, (id, bId, b) => {
  if (!id || !bId) {
    return null;
  }

  return b[bId]?.flavors?.[id] ?? null;
});
export const currentFlavorName = createSelector(currentFlavor, f => f?.name ?? null);
export const currentTagList = createSelector(currentFlavor, f => f?.tags ?? []);

export const hasAnyFlavors = createSelector(brandDictionary, (b) => 
  Object.values(b).some(({flavors}) => Object.values(flavors).length)
)