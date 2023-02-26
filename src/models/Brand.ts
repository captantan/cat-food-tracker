export interface Flavor {
  id: string /*guid*/;
  name: string;
  tags: string[];
}

export interface Brand {
  id: string;
  name: string;

  flavors: Record<string, Flavor>;
}