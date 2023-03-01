import * as React from 'react';

import { Route } from 'react-router-dom';
import { BrandsPage } from './components/Brands/BrandsPage';
import { DataPageFrame } from './components/DataPageFrame';
import { LandingPage } from './components/LandingPage';
import { MealsPage } from './components/Meals/MealsPage';

export function createEditFeature(path: string): React.ReactNode {
  return (
    <Route path={path} element={<DataPageFrame />}>
      <Route index element={<LandingPage />} />
      <Route path="brands" element={<BrandsPage />} />
      <Route path="meals" element={<MealsPage />} />
    </Route>
  );
}