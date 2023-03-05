import { LoadingState } from "../../../loading.state";
import { BrandsState } from "./brand.state";
import { MealsState } from "./meal.state";
import { UIState } from "./ui.state";

export interface EditState {
  brands: BrandsState;
  meals: MealsState;
  fileLoading: LoadingState;
  save: LoadingState;
  ui: UIState;
}
