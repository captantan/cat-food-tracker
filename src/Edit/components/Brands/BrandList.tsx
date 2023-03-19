import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { CustomNavLink } from '../../../components/CustomNavLink';
import { brandsSelectors } from '../../store/selectors';

export const BrandList: React.FC<{ basePath: string }> = ({ basePath }) => {
  const list = useSelector(brandsSelectors.brandListVM);

  return (
    <>
      {list.length ? (
        <List>
          {list.map((brand) => (
            <ListItem key={brand.id}>
              <ListItemButton
                component={CustomNavLink}
                to={basePath + brand.id}
                activeClassName="Mui-selected"
                sx={(theme) => ({
                  borderRadius: theme.shape.borderRadius + 'px',
                })}>
                <ListItemText>{brand.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography component="p" variant="caption">
          No brands, yet
        </Typography>
      )}
    </>
  );
};
