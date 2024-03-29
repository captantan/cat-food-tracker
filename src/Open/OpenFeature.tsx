import { Dialog, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { CenterBox } from '../components/CenterBox';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { LoadingDisplay } from '../components/LoadingDisplay';
import { store } from '../store/configure';
import { Content } from './components/Content';
import { NewFileForm } from './components/NewFileForm';
import { NotFound } from './components/NotFound';
import { loadingActions, newFileActions } from './store/actions';
import { loadingSelectors, newFileSelectors } from './store/selectors';

export const OpenFeature: React.FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const status = useSelector(loadingSelectors.status);
  const error = useSelector(loadingSelectors.error);
  const newFilePath = useSelector(newFileSelectors.newPath);
  const newFileError = useSelector(loadingSelectors.newFileError);
  const showNewModal = useSelector(newFileSelectors.showModal);
  const navigator = useNavigate();

  const params = useParams();
  // must be non-null to render this component?
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const path = params['*']!;
  const isRoot = !path.trim();
  const splitPath = path.split('/');
  const folderName = splitPath.pop() ?? null;
  const backPath = `/open/${splitPath.join('/')}`;

  React.useEffect(() => {
    dispatch(loadingActions.loadContent(path));
  }, [path, dispatch]);

  switch (status) {
    case 'loading':
      return <LoadingDisplay text="Getting folder content..." />;
    case 'error':
      switch (error) {
        case 404:
          return <NotFound backPath={backPath} />;
        default:
          return (
            <ErrorDisplay
              errorCode={error}
              onClick={() => dispatch(loadingActions.loadContent(path))}
            />
          );
      }
    case 'content':
      return (
        <>
          <Content
            splitPath={splitPath}
            isRoot={isRoot}
            folderName={folderName}
            path={path}
            backPath={backPath}
          />

          <Dialog
            open={showNewModal}
            onClose={() => dispatch(newFileActions.closeDialog())}>
            <NewFileForm path={path} navigator={navigator} />
          </Dialog>
        </>
      );

    case 'creating':
      return <LoadingDisplay text="Creating that file..." />;
    case 'creation error':
      return (
        <ErrorDisplay
          errorCode={newFileError}
          title="Failed to create file"
          onClick={() => {
            // this must be assigned to get to this step
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            dispatch(newFileActions.createFile(newFilePath!, navigator));
          }}
        />
      );

    case 'done':
      return (
        <CenterBox>
          <Typography variant="h6" color="primary" gutterBottom={false}>
            Redirecting to your new file
          </Typography>
          <Typography variant="body1">
            You should have your new file open shortly.
          </Typography>
        </CenterBox>
      );
  }
};
