import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { brandsActions } from '../../store/actions';
import { brandsSelectors } from '../../store/selectors';

export const BrandList: React.FC = () => {
  const list = useSelector(brandsSelectors.brandListVM);
  const dispatch = useDispatch();

  return (
    <>
      {list.length ? (
        list.map((brand) => (
          <Card sx={{ w: '100%', mb: '16px' }} key={brand.id}>
            <CardHeader
              title={brand.name}
              titleTypographyProps={{ variant: 'h6' }}></CardHeader>
            <CardContent>
              {brand.flavors.length ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Flavor</TableCell>
                        <TableCell>Tags</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {brand.flavors.map((flavor) => (
                        <TableRow key={flavor.id}>
                          <TableCell>{flavor.name}</TableCell>
                          <TableCell>
                            {flavor.tags.map((tag) => (
                              <Chip
                                key={tag}
                                label={tag}
                                sx={{
                                  mb: 1,
                                  mr: 1,
                                }}></Chip>
                            ))}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() =>
                                dispatch(
                                  brandsActions.editFlavor({
                                    brand: brand.id,
                                    flavor: flavor.id,
                                  }),
                                )
                              }>
                              <Icon>edit</Icon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography
                  component="p"
                  variant="caption"
                  sx={{ textAlign: 'center' }}>
                  This brand doesn&apos;t have any flavors, yet
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                onClick={() =>
                  dispatch(brandsActions.newFlavor({ brand: brand.id }))
                }>
                Add Flavor
              </Button>
              <Button
                onClick={() => dispatch(brandsActions.editBrand(brand.id))}>
                Edit Brand
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography component="p" variant="caption">
          No brands, yet
        </Typography>
      )}
    </>
  );
};
