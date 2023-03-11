export enum FilterType {
  Tags = 'tags',
  Flavors = 'flavors',
}

export interface FilterBase<TType extends FilterType> {
  type: TType;
  startDate: string | null;
  endDate: string | null;
}

export interface FlavorIdRecord {
  brand: string;
  flavor: string;
}

export interface FlavorFilter extends FilterBase<FilterType.Flavors> {
  flavors: FlavorIdRecord[];
}

export interface TagFilter extends FilterBase<FilterType.Tags> {
  tags: string[];
}

export type FilterDefinition = FlavorFilter | TagFilter;
