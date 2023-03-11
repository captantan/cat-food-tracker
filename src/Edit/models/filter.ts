import { BrandListState } from '../store/state';
import { FlavorIdRecord } from './brand';
import { MealEntry } from './meal';

export enum FilterType {
  Tags = 'tags',
  Flavors = 'flavors',
}

export interface FilterBase<TType extends FilterType> {
  type: TType;
}

export interface FlavorFilter extends FilterBase<FilterType.Flavors> {
  flavors: FlavorIdRecord[];
}

export interface TagFilter extends FilterBase<FilterType.Tags> {
  tags: string[];
}

export type FilterDefinition = FlavorFilter | TagFilter;

export type MealFilterFn = (entry: MealEntry) => boolean;

export function flavorFilterFn(filter: FlavorFilter): MealFilterFn {
  return (entry) => {
    return filter.flavors.some(
      (id) => entry.brand === id.brand && entry.flavor === id.flavor,
    );
  };
}

export function tagFilterFn(
  filter: TagFilter,
  brands: BrandListState,
): MealFilterFn {
  return (entry) => {
    return filter.tags.some((tag) => {
      const brand = brands[entry.brand];
      const flavor = brand.flavors[entry.flavor];

      return flavor.tags.includes(tag);
    });
  };
}
