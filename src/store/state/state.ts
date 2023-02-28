import { BrandsState } from "./brand.state";
import { MealsState } from "./meal.state";
import { UIState } from "./ui.state";

export interface State {
  brands: BrandsState;
  meals: MealsState;
  ui: UIState;
}
