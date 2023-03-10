import { LoadingState } from '../../../loading.state';
import { BrandsState } from './brand.state';
import { FileInfoState } from './file-info.state';
import { FilterState } from './filter.state';
import { MealsState } from './meal.state';
import { UIState } from './ui.state';

export interface EditState {
  brands: BrandsState;
  meals: MealsState;
  filters: FilterState;

  fileInfo: FileInfoState | null;
  fileLoading: LoadingState;
  save: LoadingState;

  ui: UIState;
}
