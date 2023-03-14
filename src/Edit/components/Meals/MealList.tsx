import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { mealSelectors } from '../../store/selectors';
import { DayCard } from './DayCard';

export const MealList: React.FC = () => {
  const list = useSelector(mealSelectors.mealListVM);

  return (
    <>
      {list.length ? (
        list.map((date) => <DayCard date={date} key={date.date} />)
      ) : (
        <Typography component="p" variant="caption">
          No meals, yet
        </Typography>
      )}
    </>
  );
};
