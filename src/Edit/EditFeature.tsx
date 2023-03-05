import { Button } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Route, Routes, useParams } from 'react-router-dom';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { LoadingDisplay } from '../components/LoadingDisplay';
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
  const saveError = useSelector(fileLoadingSelectors.saveError);

  const fileId = useParams().fileId!;
  React.useEffect(() => {
    dispatch(fileActions.loadFile(fileId));
  }, [fileId, dispatch]);

  switch(status) {
    case 'loading': return (<LoadingDisplay text="Loading the file..."/>);
    case 'error': return (
      <ErrorDisplay errorCode={error} onClick={() => {
        dispatch(fileActions.loadFile(fileId));
      }} />
    )
    case 'content':
  return (
    <Routes>
      <Route element={<DataPageFrame />}>
        <Route index element={<LandingPage />} />
        <Route path="brands" element={<BrandsPage />} />
        <Route path="meals" element={<MealsPage />} />
      </Route>
    </Routes>
  );
  case 'saving': return (<LoadingDisplay text="Saving your changes..." />);
    case 'save-failed': return (
      <ErrorDisplay title="Failed to save" errorCode={saveError} onClick={() => {
        dispatch(fileActions.saveFile(fileId));
      }} />
    )
    case 'saved':
      return (
        <>
        <p>Successfully saved</p>
        <Button onClick={() => dispatch(fileActions.returnToContent())}>
          Return to content
        </Button>
        </>
      )
  }
}