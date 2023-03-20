import { createSelector } from 'reselect';
import { State } from '../../../store/state';
import { sort, ascend, groupBy, descend } from 'ramda';
import { brandDictionary } from './brands.selectors';
import {
  Meal,
  MealDayViewModel,
  MealEntry,
  MealFormModel,
} from '../../models/meal';
import { format, parseISO } from 'date-fns';

const mealsFeatureSelector = (state: State) => state.edit.meals;

export const mealDictionary = createSelector(
  mealsFeatureSelector,
  (f) => f.data,
);

export const mealListVM = createSelector(
  mealDictionary,
  brandDictionary,
  (mD, bD) => {
    const allMeals = Object.values(mD);
    const mealsByDate = groupBy((m) => m.date, allMeals);

    const mealsByDateSorted = sort(
      descend(([date]) => date),
      Object.entries(mealsByDate),
    );

    return mealsByDateSorted.map(([date, meals]) => {
      const mealsGrouped = groupBy((m) => m.meal, meals);
      const parsed = parseISO(date);
      const formatted = format(parsed, 'PPPP');

      const result: MealDayViewModel = {
        date,
        parsed,
        formatted,
        meals: Object.values(Meal).reduce((dict, mealType) => {
          const mealsForType = mealsGrouped[mealType] ?? [];

          dict[mealType] = sort(
            ascend((m) => m.order),
            mealsForType.map((m) => {
              const brand = bD[m.brand];
              const flavor = brand.flavors[m.flavor];

              if (!flavor) {
                console.error('Could not find flavor for meal', brand, m);
              }

              return {
                ...m,
                brandName: brand.name,
                flavorName: flavor.name,
              };
            }),
          );

          return dict;
        }, {} as Record<Meal, Array<MealEntry & { brandName: string; flavorName: string }>>),
      };

      return result;
    });
  },
);

const editState = createSelector(mealsFeatureSelector, (f) => f.edit);

export const editId = createSelector(editState, (e) => e.mealId);
export const isEditOpen = createSelector(editState, (e) => e.editOpen);
export const currentData = createSelector(editId, mealDictionary, (id, b) => {
  if (!id) {
    return null;
  }

  return b[id] ?? null;
});

export const prefilDate = createSelector(editState, (s) =>
  s.prefillDate ? parseISO(s.prefillDate) : null,
);
export const prefilMeal = createSelector(editState, (s) => s.prefillMeal);

export const initialFormValues = createSelector(
  currentData,
  prefilDate,
  prefilMeal,
  (cd, date, meal) => {
    // prettier-ignore
    const initialValues: MealFormModel = cd
      ? {
        date: parseISO(cd.date),
        meal: cd.meal,
        amount: cd.amount ?? '',
        brand: cd.brand,
        flavor: cd.flavor,
        notes: cd.notes,
      } :
      {
        date: date ?? new Date(), // TODO: not deterministic...
        meal: meal ?? Meal.Breakfast,
        amount: '',
        brand: '',
        flavor: '',
        notes: '',
      };

    return initialValues;
  },
);

export const isConfirmDelete = createSelector(
  editState,
  (s) => s.confirmDelete,
);

export const hasAnyMeals = createSelector(
  mealDictionary,
  (dict) => !!Object.values(dict).length,
);

export const getNextOrder = createSelector(mealDictionary, (dict) => {
  return (date: string, meal: Meal) => {
    const existing = Object.values(dict).filter(
      (m) => m.date === date && m.meal === meal,
    );
    if (existing.length) {
      return Math.max(...existing.map((m) => m.order)) + 1;
    } else {
      return 0;
    }
  };
});
