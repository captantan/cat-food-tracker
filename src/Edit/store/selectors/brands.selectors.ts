import { createSelector } from 'reselect';
import { State } from '../../../store/state';
import { ascend, sort } from 'ramda';
import { FlavorIdRecord } from '../../models/brand';

const brandFeatureSelector = (state: State) => state.edit.brands;

export const brandDictionary = createSelector(
  brandFeatureSelector,
  (f) => f.data,
);

export const brandListVM = createSelector(brandDictionary, (b) => {
  const brands = Object.values(b);
  const sorted = sort(
    ascend((b) => b.name),
    brands,
  );

  return sorted;

  // return sorted.map((b) => {
  //   const flavors = sort(
  //     ascend((f) => f.name),
  //     Object.values(b.flavors),
  //   );

  //   return { id: b.id, name: b.name, flavors };
  // });
});

const editState = createSelector(brandFeatureSelector, (f) => f.edit);

export const editBrandId = createSelector(editState, (e) => e.brandId);
export const isEditBrandOpen = createSelector(editState, (e) => e.brandOpen);
export const currentBrandName = createSelector(
  editBrandId,
  brandDictionary,
  (id, b) => {
    if (!id) {
      return null;
    }

    return b[id]?.name ?? null;
  },
);

export const editFlavorId = createSelector(editState, (e) => e.flavorId);
export const isEditFlavorOpen = createSelector(editState, (e) => e.flavorOpen);
const currentFlavor = createSelector(
  editFlavorId,
  editBrandId,
  brandDictionary,
  (id, bId, b) => {
    if (!id || !bId) {
      return null;
    }

    return b[bId]?.flavors?.[id] ?? null;
  },
);
export const currentFlavorName = createSelector(
  currentFlavor,
  (f) => f?.name ?? null,
);
export const currentTagList = createSelector(
  currentFlavor,
  (f) => f?.tags ?? [],
);

export const hasAnyFlavors = createSelector(brandDictionary, (b) =>
  Object.values(b).some(({ flavors }) => Object.values(flavors).length),
);

export const brandSelectList = createSelector(brandDictionary, (bD) => {
  const brands = Object.values(bD);
  const mapped = brands.map((b) => ({ id: b.id, name: b.name }));

  return sort(
    ascend((b) => b.name),
    mapped,
  );
});

export const getFlavorsForBrand = createSelector(brandDictionary, (bD) => {
  return (brandId: string) => {
    const brand = bD[brandId];
    if (!brand) {
      return [];
    }

    const flavors = Object.values(brand.flavors);
    const mapped = flavors.map((f) => ({ id: f.id, name: f.name }));

    return sort(
      ascend((f) => f.name),
      mapped,
    );
  };
});

export const fullFlavorList = createSelector(brandDictionary, (bDict) =>
  sort(
    ascend((b) => b.brand.name),
    Object.values(bDict).map((brand) => ({
      brand: brand,
      flavorsSorted: sort(
        ascend((f) => f.name),
        Object.values(brand.flavors).map((f) => {
          const idObj: FlavorIdRecord = {
            brand: brand.id,
            flavor: f.id,
          };
          return { ...f, filterId: idObj /*JSON.stringify(idObj)*/ };
        }),
      ),
    })),
  ),
);

export const allTags = createSelector(brandDictionary, (bDict) => {
  const tagSet = new Set<string>();
  Object.values(bDict).forEach((brand) => {
    Object.values(brand.flavors).forEach((flavor) => {
      flavor.tags.forEach((tag) => tagSet.add(tag));
    });
  });
  return sort(
    ascend((i) => i),
    [...tagSet],
  );
});

export function selectedBrandSelectors(brandId: string) {
  const selectedBrand = createSelector(
    brandDictionary,
    (dict) => dict[brandId],
  );
  return {
    exists: createSelector(selectedBrand, (b) => !!b),
    name: createSelector(selectedBrand, (b) => b.name),
  };
}

export function flavorsForBrand(brandId: string) {
  return createSelector(brandDictionary, (dict) => {
    const brand = dict[brandId];

    if (!brand) {
      return [];
    }

    return sort(
      ascend((f) => f.name),
      Object.values(brand.flavors),
    );
  });
}
