import { BrandsState } from "./brand.state";
import { MealsState } from "./meal.state";
import { UIState } from "./ui.state";

export interface EditState {
  brands: BrandsState;
  meals: MealsState;
  ui: UIState;
}
