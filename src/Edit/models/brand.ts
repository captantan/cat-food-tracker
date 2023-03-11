export interface Flavor {
  id: string /*guid*/;
  name: string;
  tags: string[];
}

export type FlavorDictionary = Record<string /* flavor id */, Flavor>;

export interface BrandBase {
  id: string;
  name: string;
}

export interface Brand extends BrandBase {
  flavors: FlavorDictionary;
}

export interface FileBrand extends BrandBase {
  flavors: Flavor[];
}

export interface FlavorIdRecord {
  brand: string;
  flavor: string;
}
