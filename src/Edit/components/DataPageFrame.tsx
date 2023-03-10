import { Drawer, Box } from '@mui/material';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DrawerContent } from './DrawerContent';
import { useDispatch, useSelector } from 'react-redux';
import { uiSelectors } from '../store/selectors';
import { uiActions } from '../store/actions';

const drawerWidth = 240;

export const DataPageFrame: React.FC = () => {
  const dispatch = useDispatch();

  const drawerOpen = useSelector(uiSelectors.drawerOpen);
  const location = useLocation();
  const [lastLocation, setLocation] = React.useState(location);

  if (lastLocation !== location) {
    setTimeout(() => {
      dispatch(uiActions.closeDrawer());
    });
    setLocation(location);
  }

  return (
    <>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flax: { md: '0 0 auto' } }}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={() => dispatch(uiActions.closeDrawer())}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}>
          <DrawerContent />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open>
          <DrawerContent />
        </Drawer>
      </Box>

      <Box
        sx={{
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          width: {
            md: `calc(100% - ${drawerWidth}px)`,
          },
          ml: { md: `${drawerWidth}px` },
        }}>
        <Outlet />
      </Box>
    </>
  );
};
