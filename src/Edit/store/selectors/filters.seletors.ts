import { format, parseISO } from 'date-fns';
import { descend, sort } from 'ramda';
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

    return sort(
      descend((m) => m.date),
      Object.values(mealsDict)
        .filter(filterFn)
        .map((entry) => {
          const brand = brandDict[entry.brand];
          const flavor = brand.flavors[entry.flavor];
          const parsed = parseISO(entry.date);
          const formatted = format(parsed, 'PPPP');

          const res: FilterMealViewModel = {
            ...entry,
            brandName: brand.name,
            flavorName: flavor.name,
            tags: flavor.tags,
            formattedDate: formatted,
          };

          return res;
        }),
    );
  },
);
