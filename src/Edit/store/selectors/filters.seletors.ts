import { createSelector } from 'reselect';
import { State } from '../../../store/state';
import {
  FilterType,
  flavorFilterFn,
  MealFilterFn,
  tagFilterFn,
} from '../../models/filter';
import { FilterMealViewModel } from '../../models/meal';
import { brandDictionary } from './brands.selectors';
import { mealDictionary } from './meals.selectors';

const featureSelector = (state: State) => state.edit.filters;

export const showResults = createSelector(
  featureSelector,
  (f) => f.showResults,
);

export const filterSettings = createSelector(featureSelector, (f) => f.filter);

export const filtered = createSelector(
  filterSettings,
  mealDictionary,
  brandDictionary,
  (filter, mealsDict, brandDict) => {
    if (!filter) {
      return [];
    }

    let filterFn: MealFilterFn;

    switch (filter.type) {
      case FilterType.Flavors:
        filterFn = flavorFilterFn(filter);
        break;
      case FilterType.Tags:
        filterFn = tagFilterFn(filter, brandDict);
        break;
    }

    return Object.values(mealsDict)
      .filter(filterFn)
      .map((entry) => {
        const brand = brandDict[entry.brand];
        const flavor = brand.flavors[entry.flavor];

        const res: FilterMealViewModel = {
          ...entry,
          brandName: brand.name,
          flavorName: flavor.name,
          tags: flavor.tags,
        };

        return res;
      });
  },
);
