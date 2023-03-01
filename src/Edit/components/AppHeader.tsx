import { AppBar, Toolbar, Typography, Drawer, IconButton, Box, Icon } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiSelectors } from '../store/selectors';
import { uiActions } from '../store/actions';

interface AppHeaderProps {
  title: string
}

export const AppHeader: React.FC<AppHeaderProps> = (props) => {
  const dispatch = useDispatch();
  const drawerOpen = useSelector(uiSelectors.drawerOpen);

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
      <Typography variant="h6" noWrap component="div">
        {props.title}
      </Typography>
    </Toolbar>
  </AppBar>
  )
};