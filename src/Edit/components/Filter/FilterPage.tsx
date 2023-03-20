import { Box, Theme, useMediaQuery } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MobileTabs } from '../../../components/MobileTabs';
import { mapCssProp } from '../../../utils';
import { filterActions } from '../../store/actions';
import { filterSelectors } from '../../store/selectors';
import { AppHeader } from '../AppHeader';
import { FilterForm } from './FilterForm';
import { FilterResults } from './FilterResults';

export const FilterPage: React.FC = () => {
  const dispatch = useDispatch();
  const resultCount = useSelector(filterSelectors.resultCount);

  React.useEffect(() => {
    dispatch(filterActions.initPage());
  }, []);

  const isLgPlus = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  return (
    <>
      <AppHeader title="Filters"></AppHeader>

      {isLgPlus ? (
        <Box
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            boxSizing: 'border-box',
            flex: '1 0 auto',
            width: '100%',
          }}>
          <Box
            sx={(theme) => ({
              flex: '1 1 33%',
              borderRight: 1,
              borderRightColor: theme.palette.divider,
            })}>
            <Box
              sx={(theme) => ({
                position: 'sticky',
                width: '100%',
                bottom: 0,
                p: 3,
                overflow: 'auto',
                ...mapCssProp('minHeight', 'top', theme.mixins.toolbar),
                ...mapCssProp(
                  'minHeight',
                  'height',
                  theme.mixins.toolbar,
                  (val) => `calc(100vh - ${val}px)`,
                ),
              })}>
              <FilterForm />
            </Box>
          </Box>

          <Box sx={{ flex: '1 1 67%', p: 3, overflowY: 'auto' }}>
            <FilterResults />
          </Box>
        </Box>
      ) : (
        <Box component="main" sx={{ width: '100%', flex: '1 0 auto' }}>
          <MobileTabs>
            {[
              {
                key: 'filters',
                title: 'Filters',
                content: (
                  <Box sx={{ p: 3 }}>
                    <FilterForm />
                  </Box>
                ),
                disabled: false,
              },
              {
                key: 'results',
                title: `Results (${resultCount})`,
                content: <FilterResults />,
                disabled: !resultCount,
              },
            ]}
          </MobileTabs>
        </Box>
      )}
    </>
  );
};
