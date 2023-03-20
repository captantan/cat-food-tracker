import {
  IconButton,
  Theme,
  useMediaQuery,
  Icon,
  Typography,
  Box,
  Fab,
  Button,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { CenterBox } from '../../../components/CenterBox';
import { CenterColumn } from '../../../components/CenterColumn';
import { mapCssProp } from '../../../utils';
import { brandsActions } from '../../store/actions';
import { selectedBrandSelectors } from '../../store/selectors/brands.selectors';
import { AppHeader } from '../AppHeader';
import { BrandList } from './BrandList';
import { FlavorList } from './FlavorList';

export const FlavorListPage: React.FC = () => {
  const dispatch = useDispatch();

  // to be able to nav to this page, you must have brandId set
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const brandId = useParams().brandId!;
  const selectors = React.useMemo(
    () => selectedBrandSelectors(brandId),
    [brandId],
  );

  const primaryAction = (
    <IconButton
      color="inherit"
      component={Link}
      to="../"
      aria-label="Back to brand list"
      edge="start"
      sx={{ mr: 2 }}>
      <Icon>arrow_back</Icon>
    </IconButton>
  );

  const exists = useSelector(selectors.exists);
  if (!exists) {
    return (
      <>
        <AppHeader title="Unknown Brand" primaryAction={primaryAction} />

        <CenterColumn>
          <CenterBox>
            <Typography>We can&apos;t find that brand.</Typography>
          </CenterBox>
        </CenterColumn>
      </>
    );
  }

  const brandName = useSelector(selectors.name);
  const isLgPlus = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const mainContent = (
    <>
      <Box sx={{ flex: '1 0 auto', mb: 1 }}>
        <Button
          onClick={() => dispatch(brandsActions.editBrand(brandId))}
          variant="contained"
          fullWidth
          sx={{
            mb: 3,
          }}>
          Edit Brand
        </Button>
        <FlavorList brandId={brandId} />
      </Box>
      <Fab
        sx={(theme) => ({
          alignSelf: 'flex-end',
          position: 'sticky',
          bottom: theme.spacing(2),
          right: 0,
          mr: 2,
        })}
        color="secondary"
        onClick={() => dispatch(brandsActions.newFlavor({ brand: brandId }))}>
        <Icon>add</Icon>
      </Fab>
    </>
  );

  return (
    <>
      <AppHeader title={brandName} primaryAction={primaryAction} />

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
                pt: 3,
                pb: 3,
                pr: 0,
                pl: 0,
                overflow: 'auto',
                ...mapCssProp('minHeight', 'top', theme.mixins.toolbar),
                ...mapCssProp(
                  'minHeight',
                  'height',
                  theme.mixins.toolbar,
                  (val) => `calc(100vh - ${val}px)`,
                ),
              })}>
              <BrandList basePath="../" />
            </Box>
          </Box>
          <Box
            sx={{
              flex: '1 1 67%',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
            }}>
            {mainContent}
          </Box>
        </Box>
      ) : (
        <CenterColumn>{mainContent}</CenterColumn>
      )}
    </>
  );
};
