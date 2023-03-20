import { format, parseISO } from 'date-fns';
import { descend, findIndex, sort } from 'ramda';
import { createSelector } from 'reselect';
import { State } from '../../../store/state';
import {
  FilterType,
  flavorFilterFn,
  MealFilterFn,
  tagFilterFn,
} from '../../models/filter';
import { FilterMealViewModel, mealListTypeDate } from '../../models/meal';
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
      (a, b) => {
        const dateRes = descend((entry) => entry.date, a, b);
        if (dateRes !== 0) {
          return dateRes;
        }

        const mealRes = descend(
          (entry) =>
            findIndex((meal) => meal.meal === entry.meal, mealListTypeDate),
          a,
          b,
        );
        if (mealRes !== 0) {
          return mealRes;
        }

        return descend((entry) => entry.order, a, b);
      },
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

export const resultCount = createSelector(filtered, (f) => f.length);

export const expandedBrands = createSelector(
  featureSelector,
  (f) => f.expandedBrands,
);
