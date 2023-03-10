import { BrandListState, MealListState } from '../store/state';
import { FileBrand, FlavorDictionary } from './brand';
import { MealEntry } from './meal';

export interface SaveFileV1 {
  version: 1;
  brands: FileBrand[];
  meals: MealEntry[];
}

export function fromSaveFile(file: SaveFileV1): {
  brands: BrandListState;
  meals: MealListState;
} {
  return {
    brands: file.brands.reduce((dict, brand) => {
      dict[brand.id] = {
        ...brand,
        flavors: brand.flavors.reduce((fDict, flavor) => {
          fDict[flavor.id] = flavor;
          return fDict;
        }, {} as FlavorDictionary),
      };
      return dict;
    }, {} as BrandListState),
    meals: file.meals.reduce((dict, meal) => {
      dict[meal.id] = meal;
      return dict;
    }, {} as MealListState),
  };
}

export function toSaveFile(
  brands: BrandListState,
  meals: MealListState,
): SaveFileV1 {
  return {
    version: 1,
    brands: Object.values(brands).map((b) => {
      const outBrand: FileBrand = {
        ...b,
        flavors: Object.values(b.flavors),
      };
      return outBrand;
    }),
    meals: Object.values(meals),
  };
}
