import { Button } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Route, Routes, useParams } from 'react-router-dom';
import { store } from '../store/configure';
import { BrandsPage } from './components/Brands/BrandsPage';
import { DataPageFrame } from './components/DataPageFrame';
import { LandingPage } from './components/LandingPage';
import { MealsPage } from './components/Meals/MealsPage';
import { fileActions } from './store/actions';
import { fileLoadingSelectors } from './store/selectors';

export const EditFeature: React.FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const status = useSelector(fileLoadingSelectors.status);
  const error = useSelector(fileLoadingSelectors.error);

  const fileId = useParams().fileId;
  React.useEffect(() => {
    if (!fileId) {
      console.error('missing file id');
    } else {
      dispatch(fileActions.loadFile(fileId));
    }
  }, [fileId]);

  switch(status) {
    case 'loading': return (<p>Loading the file...</p>);
    case 'error': return (
      <>
        <p>An error occurred</p>
        <pre>Error Code: {error}</pre>

        <Button onClick={() => {
          if (!fileId) {
            console.error('missing file id');
          } else {
            dispatch(fileActions.loadFile(fileId));
          }
        }}>Retry</Button>
      </>
    )
    case 'done':
  return (
    <Routes>
      <Route element={<DataPageFrame />}>
        <Route index element={<LandingPage />} />
        <Route path="brands" element={<BrandsPage />} />
        <Route path="meals" element={<MealsPage />} />
      </Route>
    </Routes>
  );
  }
}