import { List, ListItem, ListItemText, ListItemButton, Toolbar, alpha, Divider } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CustomNavLink } from '../../components/CustomNavLink';
import { brandsSelectors } from '../store/selectors';

export const DrawerContent: React.FC = () => {
  const hasBrandsAndFlavors = useSelector(brandsSelectors.hasAnyFlavors);

  const listItems: Array<{ path: string; text: string; }> = [
    { text: 'Brands', path: './brands' },
  ];

  if (hasBrandsAndFlavors) {
    listItems.push({ text: 'Meals', path: './meals' })
  }

  return (
    <>
      <Toolbar />
      <List>
        {listItems.map((item) => (
          <ListItem key={item.path}>
            <ListItemButton
              component={CustomNavLink}
              to={item.path}
              activeClassName="active"
              sx={(theme) => ({
                borderRadius: '8px',
                '&.active': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.12),
                  color: theme.palette.primary.dark
                }
              })}>
              <ListItemText>{item.text}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem>
          <ListItemButton component={Link} to="/open">
            <ListItemText>Change Files</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </>);
}