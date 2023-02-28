import { AppBar, Box, Button, Toolbar, Typography, Dialog } from '@mui/material';
import React from 'react';
import { ClassNames } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { brandsSelectors, mealSelectors } from '../../store/selectors';
import { AppHeader } from '../AppHeader';
import { MealList } from './MealList';
import { Link } from 'react-router-dom';
import { mealActions } from '../../store/actions';
import { AddEditMeal } from './AddEditMeal';

export const MealsPage: React.FC = () => {
  const dispatch = useDispatch();
  
  const editModalOpen = useSelector(mealSelectors.isEditOpen);
  const hasAnyFlavors = useSelector(brandsSelectors.hasAnyFlavors);

  return (
    <>
      <AppHeader title="Meals"></AppHeader>

      <Box component="main" sx={{ padding: 3, flex: '1 0 auto' }}>
        {hasAnyFlavors ? <MealList></MealList> : (
          <>
            <Typography variant="body1">You must have foods loaded to enter meals</Typography>
            <Button component={Link} to='../brands'>Enter foods</Button>
          </>
        )}
      </Box>

      <Dialog open={editModalOpen} onClose={() => dispatch(mealActions.cancelEditMeal())}>
        <AddEditMeal></AddEditMeal>
      </Dialog>
    </>
  );
}