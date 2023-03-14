import { FilterDefinition } from '../../models/filter';

export interface FilterState {
  filter: FilterDefinition | null;
  expandedBrands: string[];
}
