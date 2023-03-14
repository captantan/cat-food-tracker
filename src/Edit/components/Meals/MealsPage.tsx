import { Box, Button, Typography, Dialog, Fab, Icon } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { brandsSelectors, mealSelectors } from '../../store/selectors';
import { AppHeader } from '../AppHeader';
import { MealList } from './MealList';
import { Link } from 'react-router-dom';
import { mealActions } from '../../store/actions';
import { AddEditMeal } from './AddEditMeal';
import { CenterColumn } from '../../../components/CenterColumn';
import { CenterBox } from '../../../components/CenterBox';

export const MealsPage: React.FC = () => {
  const dispatch = useDispatch();

  const editModalOpen = useSelector(mealSelectors.isEditOpen);
  const hasAnyFlavors = useSelector(brandsSelectors.hasAnyFlavors);

  return (
    <>
      <AppHeader title="Meals"></AppHeader>

      {hasAnyFlavors ? (
        <CenterColumn>
          <Box sx={{ flex: '1 0 auto', mb: 1 }}>
            <MealList></MealList>
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
            onClick={() =>
              dispatch(mealActions.newMeal({ date: null, meal: null }))
            }>
            <Icon>add</Icon>
          </Fab>
        </CenterColumn>
      ) : (
        <CenterBox>
          <Typography variant="body1">
            You must have foods loaded to enter meals
          </Typography>
          <Button component={Link} to="../brands">
            Enter foods
          </Button>
        </CenterBox>
      )}

      <Dialog
        open={editModalOpen}
        onClose={() => dispatch(mealActions.cancelEditMeal())}>
        <AddEditMeal></AddEditMeal>
      </Dialog>
    </>
  );
};
