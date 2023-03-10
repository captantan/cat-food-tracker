import { Button, Icon, Typography } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Route, Routes, useParams } from 'react-router-dom';
import { CenterBox } from '../components/CenterBox';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { LoadingDisplay } from '../components/LoadingDisplay';
import { store } from '../store/configure';
import { BrandsPage } from './components/Brands/BrandsPage';
import { DataPageFrame } from './components/DataPageFrame';
import { LandingPage } from './components/LandingPage';
import { MealsPage } from './components/Meals/MealsPage';
import { NotFound } from './components/NotFound';
import { fileActions } from './store/actions';
import { fileLoadingSelectors } from './store/selectors';

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
      return (
        <ErrorDisplay
          errorCode={error}
          onClick={() => {
            dispatch(fileActions.loadFile(fileId));
          }}
        />
      );
    case 'content':
      return (
        <Routes>
          <Route element={<DataPageFrame />}>
            <Route index element={<LandingPage />} />
            <Route path="brands" element={<BrandsPage />} />
            <Route path="meals" element={<MealsPage />} />
            <Route path="*" element={<NotFound />} />
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
      return (
        <CenterBox>
          <Icon
            color="primary"
            fontSize="inherit"
            sx={{ mb: 0, fontWeight: 100, fontSize: 180 }}>
            check_circle
          </Icon>
          <Typography variant="body1" sx={{ mb: 3 }} color="primary">
            Successfully saved
          </Typography>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => dispatch(fileActions.returnToContent())}>
            Return to content
          </Button>
        </CenterBox>
      );
  }
};
