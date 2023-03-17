import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Route, Routes, useParams } from 'react-router-dom';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { LoadingDisplay } from '../components/LoadingDisplay';
import { store } from '../store/configure';
import { BrandsPage } from './components/Brands/BrandsPage';
import { DataPageFrame } from './components/DataPageFrame';
import { FilterPage } from './components/Filter/FilterPage';
import { LandingPage } from './components/LandingPage';
import { MealsPage } from './components/Meals/MealsPage';
import { FallbackRoute } from './components/FallbackRoute';
import { fileActions } from './store/actions';
import { fileLoadingSelectors } from './store/selectors';
import { NotFound } from './components/NotFound';
import { Saved } from './components/Saved';

export const EditFeature: React.FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const status = useSelector(fileLoadingSelectors.status);
  const error = useSelector(fileLoadingSelectors.error);
  const saveError = useSelector(fileLoadingSelectors.saveError);

  // must be non-null for this route to match
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const fileId = useParams().fileId!;
  React.useEffect(() => {
    dispatch(fileActions.loadFile(fileId));
  }, [fileId, dispatch]);

  switch (status) {
    case 'loading':
      return <LoadingDisplay text="Loading the file..." />;
    case 'error':
      switch (error) {
        case 404:
          return <NotFound />;
        default:
          return (
            <ErrorDisplay
              errorCode={error}
              onClick={() => {
                dispatch(fileActions.loadFile(fileId));
              }}
            />
          );
      }
    case 'content':
      return (
        <Routes>
          <Route element={<DataPageFrame />}>
            <Route index element={<LandingPage />} />
            <Route path="brands" element={<BrandsPage />} />
            <Route path="filter" element={<FilterPage />} />
            <Route path="meals" element={<MealsPage />} />
            <Route path="*" element={<FallbackRoute />} />
          </Route>
        </Routes>
      );
    case 'saving':
      return <LoadingDisplay text="Saving your changes..." />;
    case 'save-failed':
      return (
        <ErrorDisplay
          title="Failed to save"
          errorCode={saveError}
          onClick={() => {
            dispatch(fileActions.saveFile(fileId));
          }}
        />
      );
    case 'saved':
      return <Saved action={() => dispatch(fileActions.returnToContent())} />;
  }
};
