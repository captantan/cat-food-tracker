import { Brand } from "../../models/brand";

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
