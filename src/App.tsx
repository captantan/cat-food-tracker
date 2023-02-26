import { Routes, Route } from 'react-router-dom';
import { BrandsPage } from './components/Brands/BrandsPage';
import { DataPageFrame } from './components/DataPageFrame';
import { LandingPage } from './components/LandingPage';
import { MealsPage } from './components/Meals/MealsPage';

function App() {
  return (
    <Routes>
      <Route element={<DataPageFrame />}>
        <Route index element={<LandingPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/meals" element={<MealsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
