import { Brand } from "../models/Brand";

export type BrandListState = Record<string, Brand>;

export interface BrandEditState {
  brandId: string | null; /* guid | null */
  flavorId: string | null; /* guid | null */
  brandOpen: boolean;
  flavorOpen: boolean;
}

export interface BrandsState {
  data: BrandListState;
  edit: BrandEditState;
}

export interface UIState {
  drawerOpen: boolean;
}

export interface State {
  brands: BrandsState;
  ui: UIState
}