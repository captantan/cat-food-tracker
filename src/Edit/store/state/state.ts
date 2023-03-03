import { BrandsState } from "./brand.state";
import { MealsState } from "./meal.state";
import { UIState } from "./ui.state";

export interface LoadingState {
  status: 'none' | 'loading' | 'error' | 'done';
  error: number | null;
}

export interface EditState {
  brands: BrandsState;
  meals: MealsState;
  fileLoading: LoadingState;
  ui: UIState;
}
