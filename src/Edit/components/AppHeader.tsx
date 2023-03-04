import { AppBar, Toolbar, Typography, Drawer, IconButton, Box, Icon } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiSelectors } from '../store/selectors';
import { uiActions } from '../store/actions';
import { useParams } from 'react-router';
import { saveFile } from '../store/actions/file.actions';
import { store } from '../../store/configure';

interface AppHeaderProps {
  title: string
}

export const AppHeader: React.FC<AppHeaderProps> = (props) => {
  const dispatch = useDispatch() as typeof store.dispatch;
  const drawerOpen = useSelector(uiSelectors.drawerOpen);
  const fileId = useParams().fileId!;

  return (
    <AppBar
    position="sticky"
    sx={{
      width: '100%',
      flex: '0 0 auto'
    }}
  >
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => dispatch(uiActions.toggleDrawer())}
        sx={{ mr: 2, display: { md: 'none' } }}
      >
        <Icon>{drawerOpen ? 'menu_open' : 'menu'}</Icon>
      </IconButton>
      <Typography variant="h6" noWrap component="div" flex="1 1 auto">
        {props.title}
      </Typography>

      <IconButton aria-label="Save" onClick={() => dispatch(saveFile(fileId))}>
        <Icon>save</Icon>
      </IconButton>
    </Toolbar>
  </AppBar>
  )
};