import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Icon,
  Badge,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiSelectors } from '../store/selectors';
import { uiActions } from '../store/actions';
import { useParams } from 'react-router';
import { saveFile } from '../store/actions/file.actions';
import { store } from '../../store/configure';

interface AppHeaderProps {
  title: string;
}

export const AppHeader: React.FC<AppHeaderProps> = (props) => {
  const dispatch = useDispatch() as typeof store.dispatch;
  const drawerOpen = useSelector(uiSelectors.drawerOpen);
  const hasUnsaved = useSelector(uiSelectors.hasUnsavedChanges);
  // must be non-null for this component to be used
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const fileId = useParams().fileId!;

  const saveIcon = <Icon>save</Icon>;

  return (
    <AppBar
      position="sticky"
      sx={{
        width: '100%',
        flex: '0 0 auto',
      }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => dispatch(uiActions.toggleDrawer())}
          sx={{ mr: 2, display: { md: 'none' } }}>
          <Icon>{drawerOpen ? 'menu_open' : 'menu'}</Icon>
        </IconButton>
        <Typography variant="h6" noWrap component="h2" flex="1 1 auto">
          {props.title}
        </Typography>

        <IconButton
          color="inherit"
          aria-label="Save"
          onClick={() => dispatch(saveFile(fileId))}>
          {hasUnsaved ? (
            <Badge variant="dot" color="secondary" overlap="circular">
              {saveIcon}
            </Badge>
          ) : (
            saveIcon
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
