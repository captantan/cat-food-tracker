import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Typography,
  Button,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { brandsActions } from '../../store/actions';
import { flavorsForBrand } from '../../store/selectors/brands.selectors';

export const FlavorList: React.FC<{ brandId: string }> = ({ brandId }) => {
  const dispatch = useDispatch();

  const listSelector = React.useMemo(() => flavorsForBrand(brandId), [brandId]);
  const list = useSelector(listSelector);

  return (
    <>
      {list.length ? (
        list.map((flavor) => (
          <Card key={flavor.id} sx={{ w: '100%', mb: 3 }}>
            <CardHeader
              title={flavor.name}
              titleTypographyProps={{ variant: 'h6', component: 'h3' }}
              sx={{ pb: 0 }}
            />
            <CardContent sx={{ pb: 0 }}>
              {flavor.tags.length ? (
                flavor.tags.map((tag) => (
                  <Chip label={tag} key={tag} sx={{ mr: 1, mb: 1 }} />
                ))
              ) : (
                <Typography component="p" variant="caption" textAlign="center">
                  No tags
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                onClick={() =>
                  dispatch(
                    brandsActions.editFlavor({
                      brand: brandId,
                      flavor: flavor.id,
                    }),
                  )
                }>
                Edit Flavor
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography component="p" variant="caption" textAlign="center">
          No meals, yet
        </Typography>
      )}
    </>
  );
};
