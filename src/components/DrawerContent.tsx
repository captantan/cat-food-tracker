import { List, ListItem, ListItemText, ListItemButton, Toolbar } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
            <ListItemButton component={Link} to={item.path}>
              <ListItemText>{item.text}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>);
}