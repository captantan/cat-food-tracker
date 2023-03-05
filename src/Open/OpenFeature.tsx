import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { store } from "../store/configure";
import { Content } from "./components/Content";
import { loadingActions } from "./store/actions";
import { loadingSelectors } from "./store/selectors";

export const OpenFeature: React.FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const status = useSelector(loadingSelectors.status);
  const error = useSelector(loadingSelectors.error);

  const params = useParams();
  const path = params['*']!;
  const isRoot = !(path.trim());
  const splitPath = path.split('/');
  const folderName = splitPath.pop() ?? null;

  React.useEffect(() => {
    dispatch(loadingActions.loadContent(path));
  }, [path, dispatch]);

  switch(status) {
    case 'loading': return (<p>Loading that folder...</p>);
    case 'error': return (
      <>
        <p>An error occurred</p>
        <pre>Error Code: {error}</pre>

        <Button onClick={() => {
          dispatch(loadingActions.loadContent(path));
        }}>Retry</Button>
      </>
    )
    case 'content':
      return <Content isRoot={isRoot} folderName={folderName} path={path} backPath={`/open/${splitPath.join('/')}`} />;
  }
}